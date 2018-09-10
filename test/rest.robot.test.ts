import {expect} from 'chai';
import {suite, test, timeout} from 'mocha-typescript';
import {of} from 'rxjs';
import {observe} from 'rxjs-marbles/mocha';
import {flatMap, tap} from 'rxjs/operators';
import {MotionStatus, SignalValue} from '../lib/model';
import {RestRobot} from '../lib/rest.robot';
import {pose, position, tool} from './fixtures';
import * as proxies from './rest.proxies';

/* tslint:disable:quotemark */
suite('RestRobot', () => {

    const robot = new RestRobot(proxies.URL);

    timeout(1);

    test("should return 'OK' on 'openGripper'", observe(() => {
        proxies.proxyOpenGripper();

        return of(1).pipe(
            flatMap(() => robot.openGripper()),
            tap((result) => expect(result).to.be.equal('OK'))
        );
    }));

    test("should return 'OK' on 'openGripper' with timeout", observe(() => {
        proxies.proxyOpenGripperTimeout();

        return of(1).pipe(
            flatMap(() => robot.openGripper(1000)),
            tap((result) => expect(result).to.be.equal('OK'))
        );
    }));

    test("should return 'OK' on 'closeGripper'", observe(() => {
        proxies.proxyCloseGripper();

        return of(1).pipe(
            flatMap(() => robot.closeGripper()),
            tap((result) => expect(result).to.be.equal('OK'))
        );
    }));

    test("should return 'OK' on 'closeGripper' with timeout", observe(() => {
        proxies.proxyCloseGripperTimeout();

        return of(1).pipe(
            flatMap(() => robot.closeGripper(1000)),
            tap((result) => expect(result).to.be.equal('OK'))
        );
    }));

    test("should return 'OK' on 'freeze'", observe(() => {
        proxies.proxyFreeze();

        return of(1).pipe(
            flatMap(() => robot.freeze()),
            tap((result) => expect(result).to.be.equal('OK'))
        );
    }));

    test("should return 'OK' on 'relax'", observe(() => {
        proxies.proxyRelax();

        return of(1).pipe(
            flatMap(() => robot.relax()),
            tap((result) => expect(result).to.be.equal('OK'))
        );
    }));

    test("should return a Pose on 'getJson-pose'", observe(() => {
        const currentPose = pose();

        proxies.proxyGetPose(currentPose);

        return of(1).pipe(
            flatMap(() => robot.getPose()),
            tap((result) => expect(result).to.be.deep.equal(currentPose))
        );
    }));

    test("should return a Position on 'getJson-position'", observe(() => {
        const currentPosition = position();

        proxies.proxyGetPosition(currentPosition);

        return of(1).pipe(
            flatMap(() => robot.getPosition()),
            tap((result) => expect(result).to.be.deep.equal(currentPosition))
        );
    }));

    test("should return a Position on 'getJson-base'", observe(() => {
        const currentBase = position();

        proxies.proxyGetBase(currentBase);

        return of(1).pipe(
            flatMap(() => robot.getBase()),
            tap((result) => expect(result).to.be.deep.equal(currentBase))
        );
    }));

    test("should return a Tool on 'getJson-tool'", observe(() => {
        const currentTool = tool();

        proxies.proxyGetToll(currentTool);

        return of(1).pipe(
            flatMap(() => robot.getTool()),
            tap((result) => expect(result).to.be.deep.equal(currentTool))
        );
    }));

    Object.keys(MotionStatus).forEach((status) => {
        const currentStatus = MotionStatus[status];

        test(`should return a ${status} on 'get-motion-status'`, observe(() => {
            proxies.proxyMotionStatus(currentStatus);

            return of(1).pipe(
                flatMap(() => robot.getMotionStatus()),
                tap((result) => expect(result).to.be.equal(currentStatus))
            );
        }));
    });

    Object.keys(SignalValue).forEach((signal) => {
        const currentSignal = SignalValue[signal];
        const port = 2;

        test(`should return a ${currentSignal} signal on 'get-output-signal`, observe(() => {
            proxies.proxyGetOutput(port, currentSignal);

            return of(1).pipe(
                flatMap(() => robot.getOutputSignal(port)),
                tap((result) => expect(result).to.be.equal(currentSignal))
            );
        }));

        test(`should return a ${currentSignal} signal on 'get-input-signal`, observe(() => {
            proxies.proxyGetInput(port, currentSignal);

            return of(1).pipe(
                flatMap(() => robot.getInputSignal(port)),
                tap((result) => expect(result).to.be.equal(currentSignal))
            );
        }));
    });

});
