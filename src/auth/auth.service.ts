import { Injectable } from '@nestjs/common'
import { UsersService } from '@src/users/services/users/users.service'
import * as bcrypt from 'bcrypt'
import { UserLoginDTO } from './dto/user-login.dto'
import { UserCreateDTO } from '@src/users/dtos/user.create.dto'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    private readonly userSerivce: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async signIn(singInUser: UserCreateDTO) {
    const user = this.userSerivce.findByName(singInUser.username)

    if (user) throw new Error('user already exists')

    singInUser.password = await bcrypt.hash(singInUser.password, 8)
    return this.userSerivce.create(singInUser)
  }

  async login(userLogin: UserLoginDTO) {
    const user = this.userSerivce.findByUsername(userLogin.username)

    if (!user) throw new Error('user dont exist')

    const isPasswordValid = await bcrypt.compare(
      userLogin.password,
      user.password
    )

    if (!isPasswordValid) throw new Error('invalid login')

    const payload = {
      sub: user.id,
      username: user.username,
      name: user.firstName,
      roles: user.roles
    }

    return {
      id: user.id,
      access_token: await this.jwtService.signAsync(payload)
    }
  }
}
