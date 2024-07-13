import { IsEmail, IsNumber, IsString } from 'class-validator'
import { User } from '../entity/user'

export class UserValidation implements User {
  @IsNumber()
  id: string

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
}
