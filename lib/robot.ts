import {Observable} from 'rxjs';
import {MotionStatus, MotorStatus, MotorStatusType, Pose, Position, RecoveryStatus, SignalValue, Tool} from './model';

export interface Robot {

    getPose(): Observable<Pose>;

    getPosition(): Observable<Position>;

    setPose(pose: Pose, speed: number, tcpVelocity?: number): Observable<void>;

    setPosition(position: Position, speed: number, tcpVelocity?: number): Observable<void>;

    runPoses(poses: Pose[], speed: number, tcpVelocity?: number): Observable<void>;

    runPositions(positions: Position[], speed: number, tcpVelocity?: number): Observable<void>;

    openGripper(timeout?: number): Observable<string>;

    closeGripper(timeout?: number): Observable<string>;

    freeze(): Observable<string>;

    relax(): Observable<string>;

    getBase(): Observable<Position>;

    setBase(base: Position): Observable<void>;

    getTool(): Observable<Tool>;

    setTool(tool: Tool): Observable<void>;

    getMotorStatus(...types: MotorStatusType[]): Observable<MotorStatus[]>;

    setOutputSignal(port: number, value: SignalValue): Observable<void>;

    getOutputSignal(port: number): Observable<SignalValue>;

    getInputSignal(port: number): Observable<SignalValue>;

    getId(): Observable<string>;

    getMotionStatus(): Observable<MotionStatus>;

    recover(): Observable<RecoveryStatus>;

    pack(): Observable<void>;

}
