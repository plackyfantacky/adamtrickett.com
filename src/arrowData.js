export const animationSettings = {
    timelineDuration: 4,
    speed: 1,
    isPlaying: true,
    isLooping: false,
    showFinalState: true,
    debugMode: true
};

export const cameraTrack = [
    {
        time: 0,
        position: { x: 2.5, y: 3.5, z: 8 },
        target: { x: 0.5, y: 0.5, z: 0 }
    },
    {
        time: 8,
        position: { x: 1, y: 4, z: 10 },
        target: { x: 0, y: 2, z: 0 }
    }
];

export const arrowPaths = [
{
    "name": "left-1",
    "origin": [
        -8,
        3.25,
        0
    ],
    "initialDirection": "+x",
    "initialNormal": "+y",
    "moves": [
        ["bendDown", 4.25]
    ],
    "timing": {
        "delay": 0,
        "duration": 4
    },
    "entry": {
        "position": "viewport",
        "side": "left",
        "margin": 3,
        "straightUntil": 3.5
    }
},
{
    "name": "left-2",
    "origin": [
        -8,
        2.35,
        0.5
    ],
    "initialDirection": "+x",
    "initialNormal": "+y",
    "moves": [
        ["bendUp", 1]
    ],
    "timing": {
        "delay": 0,
        "duration": 4
    },
    "entry": {
        "position": "viewport",
        "side": "left",
        "margin": 3,
        "straightUntil": -2.25
    }
},
{
    "name": "left-3",
    "origin": [
        -8,
        2.95,
        1.75
    ],
    "initialDirection": "+x",
    "initialNormal": "+y",
    "moves": [
        ["bendDown", 2.25]
    ],
    "timing": {
        "delay": 0.1,
        "duration": 4
    },
    "entry": {
        "position": "viewport",
        "side": "left",
        "margin": 3,
        "straightUntil": 1
    }
},
    // Right side 
{
    "name": "right-1",
    "origin": [
        8,
        0.75,
        0
    ],
    "initialDirection": "-x",
    "initialNormal": "+y",
    "moves": [
        ["bendUp", 1]
    ],
    "timing": {
        "delay": 0,
        "duration": 4
    },
    "entry": {
        "position": "viewport",
        "side": "right",
        "margin": 3,
        "straightUntil": -0.75
    }
},
{
    "name": "right-2",
    "origin": [
        8,
        2.1,
        0.5
    ],
    "initialDirection": "-x",
    "initialNormal": "+y",
    "moves": [
        ["bendDown", 1.75]
    ],
    "timing": {
        "delay": 0,
        "duration": 4
    },
    "entry": {
        "position": "viewport",
        "side": "right",
        "margin": 3,
        "straightUntil": -2
    }
},
{
    "name": "right-3",
    "origin": [
        8,
        2.5,
        1
    ],
    "initialDirection": "-x",
    "initialNormal": "+y",
    "moves": [
        ["bendUp", 1.25]
    ],
    "timing": {
        "delay": 0,
        "duration": 4
    },
    "entry": {
        "position": "viewport",
        "side": "right",
        "margin": 3,
        "straightUntil": 2
    }
},
    // {
    //     name: 'final',
    //     origin: [6, 0, 1.2],
    //     initialDirection: '-x',
    //     initialNormal: '+y',
    //     moves: [
    //         ['forward', 1],
    //         ['turnRight', 1],
    //         ['bendUp', 3],
    //         ['turnLeft', 2],
    //         ['turnLeft', 3],
    //         ['bendDown', 1],
    //         ['turnRight', 2],
    //         ['bendDown', 1],
    //         ['bendDown', 4],
    //         ['bendUp', 2],            
    //         ['bendUp', 6],
    //     ],
    //     timing: {
    //         delay: 0,
    //         duration: 6,
    //     },
    //     entry: {
    //         side: 'right',
    //         margin: 1.5,
    //         straightUntil: 2
    //     },
    //     components: [
    //         {
    //             type: 'panel',
    //             name: 'test-screen-2',
    //             placement: {
    //                 segmentIndex: 3,
    //                 align: 'centre',
    //                 anchor: 'centre',
    //             },
    //             size: {
    //                 width: 1.5,
    //                 height: 1.5,
    //                 depth: 0.12
    //             },
    //             timing: {
    //                 delay: 2.1,
    //                 duration: 0.5
    //             },
    //             frameThickness: 0.12,
    //             face: {
    //                 color: 0xFF9D2A,
    //                 image: {
    //                     src: '/assets/logo-white-outline.svg',
    //                     fit: 'contain',
    //                     rotationDegrees: -90,
    //                     padding: 0.12,
    //                     aspectRatio: 1,
    //                     scale: 1,
    //                     offset: {
    //                         x: 0,
    //                         y: 0
    //                     }
    //                 }
    //             }
    //         }
    //     ]
    // },
];

//unused but here for reference

// {
//     name: 'right-2',
//     origin: [6, 3, 9],
//     initialDirection: '-x',
//     initialNormal: '+y',
//     moves: [
//         ['forward', 3.5],
//         ['twist', 3, 360],
//         ['forward', 0.2],
//         ['turnRight', 1],
//         ['turnLeft', 1],
//         ['curveTo', { x: 4, y: 1.5, z: 0 }, {
//             endAngle: 35,
//             angleAxis: 'side',
//             endRoll: 45,
//             handleScale: 0.35
//         }]
//     ],
//     timing: {
//         delay: 0,
//         duration: 6,
//     },
// },