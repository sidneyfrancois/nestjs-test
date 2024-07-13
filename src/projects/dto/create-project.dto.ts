import { IsNotEmpty, IsOptional } from 'class-validator'

export class CreateProjectDto {
  @IsNotEmpty()
  name: string
  @IsNotEmpty()
  description: string
  @IsOptional()
  started_at?: Date
}
