import {Pose, Position} from '../lib/model';

export function pose(): Pose {
    return {
        angles: [
            Math.random(),
            Math.random(),
            Math.random(),
            Math.random(),
            Math.random(),
            Math.random()
        ]
    };
}

export function position(): Position {
    return {
        point: {
            x: Math.random(),
            y: Math.random(),
            z: Math.random()
        },
        rotation: {
            roll: Math.random(),
            pitch: Math.random(),
            yaw: Math.random()
        }
    }
}