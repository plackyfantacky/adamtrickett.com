import * as THREE from 'three';

import { animationSettings, arrowPaths } from './arrows/arrowData.js';
import { arrowFieldSettings } from './arrows/arrowFieldSettings.js';
import { createArrowPathSegments } from './arrows/createArrowPaths.js';
import { createArrow, setArrowReveal, updateArrowReveal } from './arrows/createArrow.js';
import { createArrowRenderPieces } from './arrows/createArrowRenderPieces.js';
import { createArrowPathComponents, setPathComponentReveal } from './arrows/createArrowPathComponents.js';
import { createPathComponentMesh } from './arrows/pathComponents/index.js';

const cameraTrackSettings = {
    enabled: true,
    start: new THREE.Vector3(-1.5, 5, 12.2),
    centre: new THREE.Vector3(0, 5.15, 11.85),
    end: new THREE.Vector3(1.5, 5, 12.2),
    lookAt: new THREE.Vector3(0, 0, 0)
};

const cameraTrack = new THREE.QuadraticBezierCurve3(
    cameraTrackSettings.start,
    cameraTrackSettings.centre,
    cameraTrackSettings.end
);

const cameraTrackTarget = new THREE.Vector3();

export function createArrowCloudScene(container) {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
        45,
        getContainerAspect(container),
        0.1,
        100
    );

    camera.position.copy(cameraTrackSettings.start);
    camera.lookAt(cameraTrackSettings.lookAt);

    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const arrowMaterial = new THREE.MeshStandardMaterial({
        color: 0xff9d2a,
        roughness: 0.45,
        metalness: 0.15,
        flatShading: true,
        side: THREE.FrontSide
    });

    const pathComponentMeshes = [];

    const arrows = arrowPaths.map((arrowPath) => {
        const segments = createArrowPathSegments(arrowPath);
        const pieces = createArrowRenderPieces(segments, arrowFieldSettings);
        const arrow = createArrow(pieces, arrowMaterial, arrowFieldSettings);
        const components = createArrowPathComponents(arrowPath, segments);

        arrow.userData.name = arrowPath.name;

        arrow.userData.timing = {
            delay: arrowPath.timing?.delay || 0,
            duration: arrowPath.timing?.duration || 5
        };

        arrow.userData.headTiming = {
            hideAt: arrowPath.head?.hideAt ?? null,
            hideDuration: arrowPath.head?.hideDuration ?? 0.25
        };

        components.forEach((component) => {
            const componentMesh = createPathComponentMesh(component);

            scene.add(componentMesh);
            pathComponentMeshes.push(componentMesh);
        });

        scene.add(arrow);
        setArrowReveal(arrow, 0);

        return arrow;
    });

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(4, 6, 8);
    scene.add(directionalLight);

    const timer = new THREE.Timer();

    let animationFrameId = null;
    let isRunning = true;

    function render() {
        timer.update();

        const currentTime = timer.getElapsed() * animationSettings.speed;

        arrows.forEach((arrow) => {
            updateArrowReveal(arrow, currentTime);
        });

        pathComponentMeshes.forEach((componentMesh) => {
            const delay = componentMesh.userData.timing.delay;
            const duration = componentMesh.userData.timing.duration;

            const revealProgress = THREE.MathUtils.clamp(
                (currentTime - delay) / duration,
                0,
                1
            );

            setPathComponentReveal(componentMesh, revealProgress);
        });

        updateCameraTrack(camera, currentTime);

        renderer.render(scene, camera);

        if (isRunning) {
            animationFrameId = requestAnimationFrame(render);
        }
    }

    function resize() {
        const width = container.clientWidth;
        const height = container.clientHeight;

        camera.aspect = getContainerAspect(container);
        camera.updateProjectionMatrix();

        renderer.setSize(width, height, false);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }

    function destroy() {
        isRunning = false;

        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }

        window.removeEventListener('resize', resize);

        scene.traverse((object) => {
            if (object.geometry) {
                object.geometry.dispose();
            }

            if (object.material) {
                object.material.dispose();
            }
        });

        renderer.dispose();
        renderer.domElement.remove();
    }

    resize();
    window.addEventListener('resize', resize);
    render();

    return {
        destroy,
        resize
    };
}

function updateCameraTrack(camera, currentTime) {
    if (!cameraTrackSettings.enabled) {
        return;
    }

    const rawProgress = THREE.MathUtils.clamp(
        currentTime / animationSettings.timelineDuration,
        0,
        1
    );

    const easedProgress = easeInOutSine(rawProgress);

    cameraTrack.getPoint(easedProgress, cameraTrackTarget);

    camera.position.copy(cameraTrackTarget);
    camera.lookAt(cameraTrackSettings.lookAt);
}

function easeInOutSine(progress) {
    return -(Math.cos(Math.PI * progress) - 1) / 2;
}

function getContainerAspect(container) {
    return container.clientWidth / Math.max(container.clientHeight, 1);
}
