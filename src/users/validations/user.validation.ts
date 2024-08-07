import { User } from '@src/entities/User'
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { v4 as uuidv4 } from 'uuid'

export class BaseUserValidation implements User {
  private id: string
  constructor() {
    this.id = uuidv4()
  }

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
