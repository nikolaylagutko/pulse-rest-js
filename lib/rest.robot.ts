import * as _ from 'lodash';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {MotionStatus, MotorStatus, MotorStatusType, Pose, Position, RecoveryStatus, SignalValue, Tool} from './model';
import {RxRest} from './rest.rx';
import {Robot} from './robot';

export class RestRobot implements Robot {

    private readonly rx: RxRest;

    constructor(uri: string) {
        this.rx = new RxRest(uri);
    }

    public closeGripper(timeout?: number): Observable<string> {
        return this.rx.put(RestRobot.addQuery('/gripper/close', { timeout }));
    }

    public freeze(): Observable<string> {
        return this.rx.put('/freeze');
    }

    public getBase(): Observable<Position> {
        return this.rx.getJson('/base');
    }

    public getId(): Observable<string> {
        return this.rx.get('/robot/id');
    }

    public getInputSignal(port: number): Observable<SignalValue> {
        return this.getSignal(`/signal/input/${port}`);
    }

    public getMotionStatus(): Observable<MotionStatus> {
        return this.rx.get('/status/motion').pipe(
            map((status) => MotionStatus[status])
        );
    }

    public getMotorStatus(...types: MotorStatusType[]): Observable<MotorStatus[]> {
        return this.rx.getJson('/status/motors' + RestRobot.joinMotorTypes(types));
    }

    public getOutputSignal(port: number): Observable<SignalValue> {
        return this.getSignal(`/signal/output/${port}`);
    }

    public getPose(): Observable<Pose> {
        return this.rx.getJson('/pose');
    }

    public getPosition(): Observable<Position> {
        return this.rx.getJson('/position');
    }

    public getTool(): Observable<Tool> {
        return this.rx.getJson('/tool');
    }

    public openGripper(timeout?: number): Observable<string> {
        return this.rx.put(RestRobot.addQuery('/gripper/open', { timeout }));
    }

    public pack(): Observable<void> {
        return undefined;
    }

    public recover(): Observable<RecoveryStatus> {
        return undefined;
    }

    public relax(): Observable<string> {
        return this.rx.put('/relax');
    }

    public runPoses(poses: Pose[], speed: number, tcpVelocity?: number): Observable<void> {
        return undefined;
    }

    public runPositions(positions: Position[], speed: number, tcpVelocity?: number): Observable<void> {
        return undefined;
    }

    public setBase(base: Position): Observable<void> {
        return undefined;
    }

    public setOutputSignal(port: number, value: SignalValue): Observable<void> {
        return undefined;
    }

    public setPose(pose: Pose, speed: number, tcpVelocity?: number): Observable<void> {
        return undefined;
    }

    public setPosition(position: Position, speed: number, tcpVelocity?: number): Observable<void> {
        return undefined;
    }

    public setTool(tool: Tool): Observable<void> {
        return undefined;
    }

    private getSignal(path: string): Observable<SignalValue> {
        return this.rx.get(path).pipe(
            map((result) => SignalValue[result])
        );
    }

    private static joinMotorTypes(types: MotorStatusType[]): string {
        if (types) {
            return '';
        } else {
            return '?includes=' + _.join(types, ',');
        }
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
