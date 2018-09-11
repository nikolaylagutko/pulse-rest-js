import {expect, should, use} from 'chai';
import * as chaiThings from 'chai-things';
import { power } from 'js-combinatorics';
import * as _ from 'lodash';
import {suite, test, timeout} from 'mocha-typescript';
import {of} from 'rxjs';
import {observe} from 'rxjs-marbles/mocha';
import {flatMap, tap} from 'rxjs/operators';
import {MotionStatus, MotorStatusType, RecoveryStatus, SignalValue} from '../lib/model';
import {RestRobot} from '../lib/rest.robot';
import {pose, position, tool} from './fixtures';
import * as proxies from './rest.proxies';

should();
use(chaiThings);

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

    test("should return id on 'get-id'", observe(() => {
        const id = 'ROBOT-ID';

        proxies.proxyId(id);

        return of(1).pipe(
            flatMap(() => robot.getId()),
            tap((result) => expect(result).to.be.equal(id))
        );
    }));

    _.uniqBy(power(Object.keys(MotorStatusType)).toArray(), (a) => a.length).forEach((array) => {
        test("should return motor status on 'get-motor-status'", observe(() => {
            const types: MotorStatusType[] = array.map((v) => MotorStatusType[v]);
            const parameters = types.length > 0 ? types : Object.keys(MotorStatusType).map((v) => MotorStatusType[v]);

            proxies.proxyMotorStatus(parameters);

            return of(1).pipe(
                flatMap(() => robot.getMotorStatus(...types)),
                tap((result) =>
                    result.should.all.have.keys(parameters)
                )
            );
        }));

        test("should return status for six motors on 'get-motor-status'", observe(() => {
            const types: MotorStatusType[] = array.map((v) => MotorStatusType[v]);
            const parameters = types.length > 0 ? types : Object.keys(MotorStatusType).map((v) => MotorStatusType[v]);

            proxies.proxyMotorStatus(parameters);

            return of(1).pipe(
                flatMap(() => robot.getMotorStatus(...types)),
                tap((result) =>
                    expect(result).to.have.length(6)
                )
            );
        }));
    });

    Object.keys(RecoveryStatus).forEach((status) =>
        test(`should return ${status} on 'recover'`, observe(() => {
            const recoveryStatus = RecoveryStatus[status];

            proxies.proxyRecovery(recoveryStatus);

            return of(1).pipe(
                flatMap(() => robot.recover()),
                tap((result) =>
                    expect(result).to.be.equal(recoveryStatus)
                )
            );
        }))
    );

    test("should return 'OK' on 'set-pose'", observe(() => {
        const nextPose = pose();
        const speed = 70;

        proxies.proxySetPose(nextPose, speed);

        return of(nextPose).pipe(
            flatMap((p) => robot.setPose(p, speed)),
            tap((result) =>
                expect(result).to.be.equal('OK')
            )
        );
    }));

    test("should return 'OK' on 'set-pose' with tcp-velocity", observe(() => {
        const nextPose = pose();
        const speed = 70;
        const tcpVelocity = Math.random();

        proxies.proxySetPose(nextPose, speed, tcpVelocity);

        return of(nextPose).pipe(
            flatMap((p) => robot.setPose(p, speed, tcpVelocity)),
            tap((result) =>
                expect(result).to.be.equal('OK')
            )
        );
    }));

    test("should return 'OK' on 'set-position'", observe(() => {
        const nextPosition = position();
        const speed = 70;

        proxies.proxySetPosition(nextPosition, speed);

        return of(nextPosition).pipe(
            flatMap((p) => robot.setPosition(p, speed)),
            tap((result) =>
                expect(result).to.be.equal('OK')
            )
        );
    }));

    test("should return 'OK' on 'set-position' with tcp-velocity", observe(() => {
        const nextPosition = position();
        const speed = 70;
        const tcpVelocity = Math.random();

        proxies.proxySetPosition(nextPosition, speed, tcpVelocity);

        return of(nextPosition).pipe(
            flatMap((p) => robot.setPosition(p, speed, tcpVelocity)),
            tap((result) =>
                expect(result).to.be.equal('OK')
            )
        );
    }));

    test("should return 'OK' on 'run-poses'", observe(() => {
        const poses = [pose(), pose(), pose()];
        const speed = 70;

        proxies.proxyRunPoses(poses, speed);

        return of(poses).pipe(
            flatMap((p) => robot.runPoses(p, speed)),
            tap((result) =>
                expect(result).to.be.equal('OK')
            )
        );
    }));

    test("should return 'OK' on 'run-poses' with tcp-velocity", observe(() => {
        const poses = [pose(), pose(), pose()];
        const speed = 70;
        const tcpVelocity = Math.random();

        proxies.proxyRunPoses(poses, speed, tcpVelocity);

        return of(poses).pipe(
            flatMap((p) => robot.runPoses(p, speed, tcpVelocity)),
            tap((result) =>
                expect(result).to.be.equal('OK')
            )
        );
    }));

    test("should return 'OK' on 'run-positions'", observe(() => {
        const positions = [ position(), position(), position() ];
        const speed = 70;

        proxies.proxyRunPositions(positions, speed);

        return of(positions).pipe(
            flatMap((p) => robot.runPositions(p, speed)),
            tap((result) =>
                expect(result).to.be.equal('OK')
            )
        );
    }));

    test("should return 'OK' on 'run-positions' with tcp-velocity", observe(() => {
        const positions = [ position(), position(), position() ];
        const speed = 70;
        const tcpVelocity = Math.random();

        proxies.proxyRunPositions(positions, speed, tcpVelocity);

        return of(positions).pipe(
            flatMap((p) => robot.runPositions(p, speed, tcpVelocity)),
            tap((result) =>
                expect(result).to.be.equal('OK')
            )
        );
    }));

});
