import * as THREE from 'three';

import { animationSettings, arrowPaths } from './arrows/arrowData.js';
import { arrowFieldSettings } from './arrows/arrowFieldSettings.js';
import { createArrowPathSegments } from './arrows/createArrowPaths.js';
import { createArrow, setArrowReveal, updateArrowReveal } from './arrows/createArrow.js';
import { createArrowRenderPieces } from './arrows/createArrowRenderPieces.js';
import { createArrowPathComponents, setPathComponentReveal } from './arrows/createArrowPathComponents.js';
import { createPathComponentMesh } from './arrows/pathComponents/index.js';

export function createArrowCloudScene(container) {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
        45,
        getContainerAspect(container),
        0.1,
        100
    );

    camera.position.set(0, 5, 12);
    camera.lookAt(0, 0, 0);

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

function getContainerAspect(container) {
    return container.clientWidth / Math.max(container.clientHeight, 1);
}