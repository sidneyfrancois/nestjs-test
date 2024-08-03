import { User } from '@src/entities/User'
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class BaseUserValidation implements User {
  @IsString()
  firstName: string

  @IsString()
  lastName: string

  @IsNumber()
  age: number

  @IsEmail()
  email: string

  @IsString()
  username: string

  @IsString()
  password: string

  @IsNotEmpty()
  roles: string[]
}
