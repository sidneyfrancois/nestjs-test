import { UserEntity } from '@src/v2/core/domain/entities/user.entity'
import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString
} from 'class-validator'

export class CreateUserDTO extends UserEntity {
  @IsOptional()
  id: string

  @IsString()
  @IsNotEmpty()
  firstName: string

  @IsString()
  @IsNotEmpty()
  lastName: string

  @IsNumber()
  @IsNotEmpty({
    message: 'idade nao pode ser vazia'
  })
  age: number

  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  username: string

  @IsString()
  @IsNotEmpty()
  password: string

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  roles: string[]
}
