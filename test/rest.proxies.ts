import * as nock from 'nock';

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