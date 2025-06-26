export interface Task {
    id?: number;
    name: string;
    status: Status;
    priority: Priority;
}

export enum Status {
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED'
}

export enum Priority {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH'
}