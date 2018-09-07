import {Robot} from './robot';
import {Observable} from 'rxjs';
import {MotionStatus, MotorStatus, MotorStatusType, Pose, Position, RecoveryStatus, SignalValue, Tool} from './model';

export class RestRobot implements Robot {
    closeGripper(timeout?: number): Observable<void> {
        return undefined;
    }

    freeze(): Observable<void> {
        return undefined;
    }

    getBase(): Observable<Position> {
        return undefined;
    }

    getId(): Observable<string> {
        return undefined;
    }

    getInputSignal(port: number): Observable<SignalValue> {
        return undefined;
    }

    getMotionStatus(): Observable<MotionStatus> {
        return undefined;
    }

    getMotorStatus(...types: MotorStatusType[]): Observable<MotorStatus[]> {
        return undefined;
    }

    getOutputSignal(port: number): Observable<SignalValue> {
        return undefined;
    }

    getPose(): Observable<Pose> {
        return undefined;
    }

    getPosition(): Observable<Position> {
        return undefined;
    }

    getTool(): Observable<Tool> {
        return undefined;
    }

    openGripper(timeout?: number): Observable<void> {
        return undefined;
    }

    pack(): Observable<void> {
        return undefined;
    }

    recover(): Observable<RecoveryStatus> {
        return undefined;
    }

    relax(): Observable<void> {
        return undefined;
    }

    runPoses(poses: Pose[], speed: number, tcpVelocity?: number): Observable<void> {
        return undefined;
    }

    runPositions(positions: Position[], speed: number, tcpVelocity?: number): Observable<void> {
        return undefined;
    }

    setBase(base: Position): Observable<void> {
        return undefined;
    }

    setOutputSignal(port: number, value: SignalValue): Observable<void> {
        return undefined;
    }

    setPose(pose: Pose, speed: number, tcpVelocity?: number): Observable<void> {
        return undefined;
    }

    setPosition(position: Position, speed: number, tcpVelocity?: number): Observable<void> {
        return undefined;
    }

    setTool(tool: Tool): Observable<void> {
        return undefined;
    }

}