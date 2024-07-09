import { PipeTransform, Injectable, NotFoundException } from '@nestjs/common'
import { UsersService } from '../services/users/users.service'
import { User } from '../entity/user'

@Injectable()
export class FetchUser implements PipeTransform<string, any> {
  constructor(private readonly userService: UsersService) {}

  transform(userId: string): User {
    const user = this.userService.findById(userId)
    if (!user) throw new NotFoundException()
    return user
  }
}
