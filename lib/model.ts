
export interface Pose {
    angles: number[];
}

export interface Point {
    x: number;
    y: number;
    z: number;
}

export interface Rotation {
    roll: number;
    pitch: number;
    yaw: number;
}

export interface Position {
    point: Point;
    rotation: Rotation;
}

export interface Tool {
    name: string;
    point: Point;
    rotation: Rotation;
    radius: number;
}

export interface MotorStatus {
    angle?: number;
    rotorVelocity?: number;
    rmsCurrent?: number;
    voltage?: number;
    phaseCurrent?: number;
    statorTemperature?: number;
    velocityError?: number;
    velocitySetpoint?: number;
    velocityFeedback?: number;
    velocityOutput?: number;
    positionSetpoint?: number;
    positionFeedback?: number;
    positionOutput?: number;
}

export enum MotorStatusType {
    ANGLE = 'angle',
    ROTOR_VELOCITY = 'rotor_velocity',
    RMS_CURRENT = 'rms_current',
    VOLTAGE = 'voltage',
    CURRENT = 'current',
    STATOR_TEMPERATURE = 'stator_temperature',
    SERVO_TEMPERATURE = 'servo_temperature',
    CONTROLLER_VELOCITY_ERROR = 'velocityError',
    CONTROLLER_VELOCITY_SETPOINT = 'velocitySetpoint',
    CONTROLLER_VELOCITY_FEEDBACK = 'velocityFeedback',
    CONTROLLER_VELOCITY_OUTPUT = 'velocityOutput',
    CONTROLLER_POSITION_ERROR = 'positionError',
    CONTROLLER_POSITION_SETPOINT = 'positionSetpoint',
    CONTROLLER_POSITION_FEEDBACK = 'positionFeedback',
    CONTROLLER_POSITION_OUTPUT = 'positionOutput'
}

export enum SignalValue {
    HIGH = 'high',
    LOW = 'low'
}

export enum MotionStatus {
    IDLE = 'idle',
    ZERO_GRAVITY = 'zero_gravity',
    RUNNING = 'running',
    MOTION_FAILED = 'motion_failed',
    EMERGENCY = 'emergency',
    ERROR = 'error'
}

export enum RecoveryStatus {
    SUCCESS = 'success',
    FAILED = 'failed'
}
