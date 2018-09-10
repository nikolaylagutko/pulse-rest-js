import * as nock from 'nock';
import {MotionStatus, Pose, Position, SignalValue, Tool} from '../lib/model';

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

export function proxyGetBase(base: Position) {
    nock(URL).get('/base').reply(200, base);
}

export function proxyGetToll(tool: Tool) {
    nock(URL).get('/tool').reply(200, tool);
}

export function proxyMotionStatus(status: MotionStatus) {
    nock(URL).get('/status/motion').reply(200, MotionStatus[status]);
}

export function proxyGetOutput(port: number, signal: SignalValue) {
    nock(URL).get(`/signal/output/${port}`).reply(200, SignalValue[signal]);
}

export function proxyGetInput(port: number, signal: SignalValue) {
    nock(URL).get(`/signal/input/${port}`).reply(200, SignalValue[signal]);
}
