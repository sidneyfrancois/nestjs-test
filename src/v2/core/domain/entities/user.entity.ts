import { Entity } from '@/core/base/Entity'
import * as bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'

export class UserEntity extends Entity {
  constructor(
    readonly id: string,
    readonly firstName: string,
    readonly lastName: string,
    readonly username: string,
    readonly password: string,
    readonly age: number,
    readonly email: string,
    readonly roles: string[]
  ) {
    super()
  }

  static async create(userData: {
    firstName: string
    lastName: string
    username: string
    password: string
    age: number
    email: string
    roles: string[]
  }) {
    userData.password = await bcrypt.hash(userData.password, 8)

    return new UserEntity(
      uuidv4(),
      userData.firstName,
      userData.lastName,
      userData.username,
      userData.password,
      userData.age,
      userData.email,
      userData.roles
    )
  }
}
