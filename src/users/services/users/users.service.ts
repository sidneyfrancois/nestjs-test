import { Injectable } from '@nestjs/common'
import { UserFilters } from '@src/filters/user.filters'
import { UserCreateDTO } from '@src/users/dtos/user.create.dto'
import { User } from '@src/users/entity/user'
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class UsersService {
  private readonly users: User[] = []

  create(user: UserCreateDTO): User {
    const newId = uuidv4()
    const newUser = { id: newId, ...user }
    this.users.push(newUser)
    return newUser
  }

  findById(id: string): User {
    return this.users.find((user: User) => user.id === id)
  }

  findAll(filters: UserFilters): User[] {
    if (filters.name) console.log('filters: ', { ...filters })
    return this.users
  }

  findByUsername(username: string): User {
    const user = this.users.find((user: User) => user.username === username)
    return user
  }

  findByName(name: string): User {
    const user = this.users.find((user: User) => user.firstName === name)
    return user
  }
}
