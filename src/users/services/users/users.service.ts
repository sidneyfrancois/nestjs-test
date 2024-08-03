import { Injectable } from '@nestjs/common'
import { UserFilters } from '@src/filters/user.filters'
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class UsersService {
  private readonly users: any[] = []

  create(user: any): any {
    const newId = uuidv4()
    const newUser = { id: newId, ...user }
    this.users.push(newUser)
    return newUser
  }

  findById(id: string): any {
    return this.users.find((user: any) => user.id === id)
  }

  findAll(filters: UserFilters): any[] {
    if (filters.name) console.log('filters: ', { ...filters })
    return this.users
  }

  findByUsername(username: string): any {
    const user = this.users.find((user: any) => user.username === username)
    return user
  }

  findByName(name: string): any {
    const user = this.users.find((user: any) => user.firstName === name)
    return user
  }
}
