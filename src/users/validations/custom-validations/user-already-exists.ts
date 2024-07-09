import {
  registerDecorator,
  ValidationOptions,
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
}

export function IsUserAlreadyExist(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: { message: 'Usuário já existe.', ...validationOptions },
      constraints: [],
      validator: IsUserAlreadyExistConstraint
    })
  }
}
