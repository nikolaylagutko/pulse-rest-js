import {Robot} from './robot';
import {Observable} from 'rxjs';
import {MotionStatus, MotorStatus, MotorStatusType, Pose, Position, RecoveryStatus, SignalValue, Tool} from './model';
import {RxRest} from './rest.rx';

export class RestRobot implements Robot {

    private readonly rx: RxRest;

    constructor(uri: string) {
        this.rx = new RxRest(uri);
    }

    closeGripper(timeout?: number): Observable<void> {
        return this.rx.put(RestRobot.addQuery('/gripper/close', { timeout: timeout }));
    }

    freeze(): Observable<void> {
        return this.rx.put('/freeze');
    }

    getBase(): Observable<Position> {
        return this.rx.get('/base');
    }

    getId(): Observable<string> {
        return this.rx.get('/robot/id');
    }

    getInputSignal(port: number): Observable<SignalValue> {
        return this.rx.get(`/signal/input/${port}`);
    }

    getMotionStatus(): Observable<MotionStatus> {
        return this.rx.get('/status/motion');
    }

    getMotorStatus(...types: MotorStatusType[]): Observable<MotorStatus[]> {
        return undefined;
    }

    getOutputSignal(port: number): Observable<SignalValue> {
        return this.rx.get(`/signal/output/${port}`);
    }

    getPose(): Observable<Pose> {
        return this.rx.get('/pose');
    }

    getPosition(): Observable<Position> {
        return this.rx.get('/position');
    }

    getTool(): Observable<Tool> {
        return undefined;
    }

    openGripper(timeout?: number): Observable<void> {
        return this.rx.put(RestRobot.addQuery('/gripper/open', { timeout: timeout }));
    }

    pack(): Observable<void> {
        return undefined;
    }

    recover(): Observable<RecoveryStatus> {
        return undefined;
    }

    relax(): Observable<void> {
        return this.rx.put('/relax');
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

    private static addQuery(base: string, query?): string {
        let result = base;

        if (query) {
            result += '?';

            Object.keys(query).forEach((key) => {
                const value = query[key];

                if (value) {
                    result += key + '=' + value.toString() + '&';
                }
            });

            result = result.slice(0, -1);
        }

        return result;
    }

}