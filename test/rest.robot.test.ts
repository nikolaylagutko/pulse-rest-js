// Reference mocha-typescript's global definitions:
/// <reference path="../node_modules/mocha-typescript/globals.d.ts" />

import * as proxies from './rest.proxies';
import {RestRobot} from '../lib/rest.robot';
import {observe} from 'rxjs-marbles/mocha';
import {flatMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {expect} from 'chai';

describe('RestRobot', () => {

    const robot = new RestRobot(proxies.URL);

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

});