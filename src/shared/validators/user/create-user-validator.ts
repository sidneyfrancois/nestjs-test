import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString
} from 'class-validator'
import { User } from '@src/entities/User'

export class CreateUserValidator implements User {
  public getDefaultFormErrorMessage() {
    return {
      logMessage: 'error on user registration',
      clientMessage: 'erro no cadastro de usuário'
    }
  }

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
