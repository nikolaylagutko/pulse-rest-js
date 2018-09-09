import * as nock from 'nock';
import {Pose, Position} from '../lib/model';


export const URL = 'http://robot.rozum.com';
export const TIMEOUT = 1000;

export function proxyOpenGripper() {
    nock(URL).put('/gripper/open').reply(200, 'OK');
}

export function proxyCloseGripper() {
    nock(URL).put('/gripper/close').reply(200, 'OK');
}

export function proxyOpenGripperTimeout() {
    nock(URL).put(`/gripper/open?timeout=${TIMEOUT}`).reply(200, 'OK');
}

export function proxyCloseGripperTimeout() {
    nock(URL).put(`/gripper/close?timeout=${TIMEOUT}`).reply(200, 'OK');
}

export function proxyFreeze() {
    nock(URL).put('/freeze').reply(200, 'OK');
}

export function proxyRelax() {
    nock(URL).put('/relax').reply(200, 'OK');
}

export function proxyGetPose(pose: Pose) {
    nock(URL).get('/pose').reply(200, pose);
}

export function proxyGetPosition(position: Position) {
    nock(URL).get('/position').reply(200, position);
}