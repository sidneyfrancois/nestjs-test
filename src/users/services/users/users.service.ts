import { Injectable } from '@nestjs/common'
import { UserFilters } from '@src/filters/user.filters'
import { UserCreateDTO } from '@src/users/dtos/user.create.dto'
import { User } from '@src/users/entity/user'

@Injectable()
export class UsersService {
  private readonly users: User[] = []

  create(user: UserCreateDTO) {
    this.users.push(user)
  }

  findAll(filters: UserFilters): User[] {
    if (filters.name) console.log('filters: ', { ...filters })
    return this.users
  }

  findByName(userName: string): User {
    const user = this.users.find((user: User) => user.firstName === userName)
    return user
  }
}
