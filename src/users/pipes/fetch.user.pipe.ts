import { PipeTransform, Injectable, NotFoundException } from '@nestjs/common'
import { UsersService } from '../services/users/users.service'

@Injectable()
export class FetchUser implements PipeTransform<string, any> {
  constructor(private readonly userService: UsersService) {}

  transform(userId: string): any {
    const user = this.userService.findById(userId)
    if (!user) throw new NotFoundException()
    return user
  }
}
