import { PartialType } from '@nestjs/mapped-types'
import { CreateProjectDto } from './create-project.dto'
import { IsOptional } from 'class-validator'

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
  @IsOptional()
  name: string
  @IsOptional()
  description: string
  @IsOptional()
  started_at: Date
  @IsOptional()
  cancelled_at: Date
  @IsOptional()
  forecast_at: Date
  @IsOptional()
  finished_at: Date
}
