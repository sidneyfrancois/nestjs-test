export class Project {
  id: string
  name: string
  description: string
  started_at?: Date
  cancelled_at?: Date
  forecast_at?: Date
  finished_at?: Date
  status: ProjectStatus
}

export enum ProjectStatus {
  Pending = 'pending',
  Active = 'active',
  Cancelled = 'cancelled',
  Completed = 'completed'
}
