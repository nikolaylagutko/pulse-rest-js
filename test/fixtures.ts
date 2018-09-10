import { generate } from 'unique-names-generator';
import {Point, Pose, Position, Rotation, Tool} from '../lib/model';

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
        point: point(),
        rotation: rotation()
    };
}

export function tool(): Tool {
    return {
        name: generate(),
        point: point(),
        radius: Math.random(),
        rotation: rotation()
    };
}

function point(): Point {
    return {
        x: Math.random(),
        y: Math.random(),
        z: Math.random()
    };
}

function rotation(): Rotation {
    return {
        pitch: Math.random(),
        roll: Math.random(),
        yaw: Math.random()
    };
}
