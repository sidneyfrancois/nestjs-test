import { IsNotEmpty } from 'class-validator'

export class StartProjectDTO {
  @IsNotEmpty()
  id: string

  @IsNotEmpty()
  started_at: Date
}
