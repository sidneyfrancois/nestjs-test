import { v4 as uuidv4 } from 'uuid'
import { Expose, Transform } from 'class-transformer'

export class Project {
  constructor() {
    this.id = uuidv4()
  }

  id: string
  name: string
  description: string
  started_at?: Date
  cancelled_at?: Date
  forecast_at?: Date
  finished_at?: Date
  @Transform(
    ({ obj }) =>
      obj.started_at ? ProjectStatus.Active : ProjectStatus.Pending,
    { toClassOnly: true }
  )
  @Expose()
  status: ProjectStatus

  start(started_at: Date) {
    if (this.status === ProjectStatus.Active)
      throw new Error('Cannot start activated project.')

    if (this.status === ProjectStatus.Completed)
      throw new Error('Cannot start completed project.')

    if (this.status === ProjectStatus.Cancelled)
      throw new Error('Cannot start cancelled project.')

    this.started_at = started_at
    this.status = ProjectStatus.Active
  }
}

export enum ProjectStatus {
  Pending = 'pending',
  Active = 'active',
  Cancelled = 'cancelled',
  Completed = 'completed'
}
