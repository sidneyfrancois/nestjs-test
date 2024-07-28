import {
  registerDecorator,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator'
import { Injectable } from '@nestjs/common'
import { UsersService } from '@src/users/services/users/users.service'

@ValidatorConstraint({ async: false })
@Injectable()
export class IsUserAlreadyExistConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly userService: UsersService) {}

  validate(userName: string): boolean {
    const user = this.userService.findByName(userName)
    if (user) return false
    return true
  }

  defaultMessage(): string {
    return `O usuário de nome $value já existe.`
  }
}

export function IsUserAlreadyExist() {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: {
        context: {
          errorCode: 1003,
          classValidation: object.constructor.name
        }
      },
      constraints: [],
      validator: IsUserAlreadyExistConstraint
    })
  }
}
