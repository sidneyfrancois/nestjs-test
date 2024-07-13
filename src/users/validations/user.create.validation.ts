import { OmitType } from '@nestjs/mapped-types'
import { UserValidation } from './user.validation'
import { IsNotEmpty } from 'class-validator'
import { IsUserAlreadyExist } from './custom-validations/user-already-exists'

export class CreateUserRequest extends OmitType(UserValidation, [
  'id'
] as const) {
  @IsNotEmpty()
  @IsUserAlreadyExist()
  firstName: string

  @IsNotEmpty()
  lastName: string

  @IsNotEmpty()
  age: number

  @IsNotEmpty()
  email: string

  @IsNotEmpty()
  username: string

  @IsNotEmpty()
  password: string
}
