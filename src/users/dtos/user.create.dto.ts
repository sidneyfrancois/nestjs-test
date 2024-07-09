import { User } from '../entity/user'

export type UserCreateDTO = Omit<User, 'id'>
