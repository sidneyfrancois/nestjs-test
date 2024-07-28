import { PipeTransform, Injectable, NotFoundException } from '@nestjs/common'
import { UsersService } from '../services/users/users.service'
import { CreateUserRequest } from '../validations/user.create.validation'

@Injectable()
export class IsUserAlreadyExistsPipe
  implements PipeTransform<CreateUserRequest, CreateUserRequest>
{
  constructor(private readonly userService: UsersService) {}

  transform(user: CreateUserRequest): CreateUserRequest {
    const userFound = this.userService.findByName(user.firstName)
    if (userFound) throw new NotFoundException('user already exists!!!!')
    return user
  }
}
