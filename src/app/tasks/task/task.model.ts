export enum Type {
  DEVELOPMENT = 'DEVELOPMENT',
  TESTING = 'TESTING',
  ANALYSIS = 'ANALYSIS',
  DESIGN = 'DESIGN'
}

export enum Status {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE'
}

export enum Priority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH'
}

export interface Task {
  taskId: number,
  employeeId: number,
  type: Type,
  status: Status,
  priority: Priority,
  description: string,
  startDate: string,
  endDate: string
}
