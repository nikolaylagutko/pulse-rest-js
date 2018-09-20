import * as _ from 'lodash';
import * as nock from 'nock';
import {MotionStatus, Pose, Position, RecoveryStatus, SignalValue, Tool} from '../lib/model';

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

export function proxyId(id: string) {
    nock(URL).get('/robot/id').reply(200, id);
}

export function proxyMotorStatus(requested: string[], fields: string[]) {
    nock(URL).get('/status/motors' + statusIncludeLine(requested)).reply(
        200,
        [
            statusObject(fields),
            statusObject(fields),
            statusObject(fields),
            statusObject(fields),
            statusObject(fields),
            statusObject(fields)
        ]
    );
}

export function proxyRecovery(status: RecoveryStatus) {
    nock(URL).put('/recover').reply(200, RecoveryStatus[status]);
}

export function proxySetPose(pose: Pose, speed: number, tcpVelocity?: number) {
    nock(URL).put(withSpeedAndVelocity('/pose', speed, tcpVelocity), pose).reply(200, 'OK');
}

export function proxySetPosition(position: Position, speed: number, tcpVelocity?: number) {
    nock(URL).put(withSpeedAndVelocity('/position', speed, tcpVelocity), position).reply(200, 'OK');
}

export function proxyRunPoses(poses: Pose[], speed: number, tcpVelocity?: number) {
    nock(URL).put(withSpeedAndVelocity('/poses/run', speed, tcpVelocity), poses).reply(200, 'OK');
}

export function proxyRunPositions(positions: Position[], speed: number, tcpVelocity?: number) {
    nock(URL).put(withSpeedAndVelocity('/positions/run', speed, tcpVelocity), positions).reply(200, 'OK');
}

export function pack() {
    nock(URL).put('/pack').reply(200, 'OK');
}

function statusIncludeLine(statuses: string[]) {
    if (statuses.length === 0) {
        return '';
    } else {
        return '?include=' + _.join(statuses, ',');
    }
}

function statusObject(statuses: string[]) {
    const obj = {};

    statuses.forEach((s) => obj[s] = Math.random());

    return obj;
}

function withSpeedAndVelocity(base: string, speed: number, tcpVelocity?: number) {
    const withSpeed = `${base}?speed=${speed}`;

    return tcpVelocity ? `${withSpeed}&tcpVelocity=${tcpVelocity}` : withSpeed;
}
