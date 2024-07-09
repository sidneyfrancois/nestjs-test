import { UserFilters } from '@src/filters/user.filters'
import { Transform } from 'class-transformer'
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min
} from 'class-validator'

export class GetUsersQueryFilters implements UserFilters {
  @IsNotEmpty()
  @IsInt()
  @Transform(({ value }) => parseInt(value, 10))
  page: number

  @Min(1)
  @IsInt()
  @IsNotEmpty({ message: 'É necessário inserir o tamanho da página.' })
  @Transform(({ value }) => parseInt(value, 10))
  limit: number

  @IsNotEmpty()
  sortBy: string

  @IsOptional()
  @IsString()
  name: string

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10))
  age: number
}
