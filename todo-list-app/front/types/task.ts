export enum Status {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED"
}

export enum Priority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH"
}

export interface Task {
  id: number;
  taskName: string;
  status: Status;
  priority: Priority;
}
