import { OmitType } from '@nestjs/mapped-types'
import { UserValidation } from './user.validation'
import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from 'class-validator'
import { IsUserAlreadyExist } from './custom-validations/user-already-exists'

export class CreateUserRequest extends OmitType(UserValidation, [
  'id'
] as const) {
  @IsNotEmpty()
  @IsUserAlreadyExist()
  firstName: string

  @IsNotEmpty()
  lastName: string

  @IsNotEmpty({
    message: 'teste de erro na idade',
    context: {
      errorCode: 1003,
      classValidation: CreateUserRequest.name
    }
  })
  age: number

  @IsNotEmpty()
  email: string

  @IsNotEmpty()
  username: string

  @IsNotEmpty()
  password: string

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  roles: string[]
}
