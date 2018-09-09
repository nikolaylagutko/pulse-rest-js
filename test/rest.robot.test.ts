// Reference mocha-typescript's global definitions:
/// <reference path="../node_modules/mocha-typescript/globals.d.ts" />

import * as proxies from './rest.proxies';
import {RestRobot} from '../lib/rest.robot';
import {observe} from 'rxjs-marbles/mocha';
import {flatMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {expect} from 'chai';
import {pose, position} from './fixtures';

describe('RestRobot', (suite) => {

    const robot = new RestRobot(proxies.URL);

    timeout(1);

    it("should return 'OK' on 'openGripper'", observe(() => {
        proxies.proxyOpenGripper();

        return of(1).pipe(
            flatMap(() => robot.openGripper()),
            tap((result) => expect(result).to.be.equal('OK'))
        );
    }));

    it("should return 'OK' on 'openGripper' with timeout", observe(() => {
        proxies.proxyOpenGripperTimeout();

        return of(1).pipe(
            flatMap(() => robot.openGripper(1000)),
            tap((result) => expect(result).to.be.equal('OK'))
        );
    }));

    it("should return 'OK' on 'closeGripper'", observe(() => {
        proxies.proxyCloseGripper();

        return of(1).pipe(
            flatMap(() => robot.closeGripper()),
            tap((result) => expect(result).to.be.equal('OK'))
        );
    }));

    it("should return 'OK' on 'closeGripper' with timeout", observe(() => {
        proxies.proxyCloseGripperTimeout();

        return of(1).pipe(
            flatMap(() => robot.closeGripper(1000)),
            tap((result) => expect(result).to.be.equal('OK'))
        );
    }));

    it("should return 'OK' on 'freeze'", observe(() => {
        proxies.proxyFreeze();

        return of(1).pipe(
            flatMap(() => robot.freeze()),
            tap((result) => expect(result).to.be.equal('OK'))
        );
    }));

    it("should return 'OK' on 'relax'", observe(() => {
        proxies.proxyRelax();

        return of(1).pipe(
            flatMap(() => robot.relax()),
            tap((result) => expect(result).to.be.equal('OK'))
        );
    }));

    it("should return a Pose on 'get-pose'", observe(() => {
        const _pose = pose();

        proxies.proxyGetPose(_pose);

        return of(1).pipe(
            flatMap(() => robot.getPose()),
            tap((result) => expect(result).to.be.deep.equal(_pose))
        );
    }));

    it("should return a Position on 'get-position'", observe(() => {
        const _position = position();

        proxies.proxyGetPosition(_position);

        return of(1).pipe(
            flatMap(() => robot.getPosition()),
            tap((result) => expect(result).to.be.deep.equal(_position))
        );
    }));

});