import { UserLoginDTO } from '@/shared/dtos/login-user.dto'
import { UsersRepository } from '@/core/repositories/users.repository'
import { Injectable, UnprocessableEntityException } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class LoginUserUseCase {
  constructor(
    private readonly repository: UsersRepository,
    private readonly jwtService: JwtService
  ) {}
  async execute(login: UserLoginDTO) {
    const user = await this.repository.findOne({ username: login.username })

    if (!user) throw new UnprocessableEntityException('user dont exist')

    const isPasswordValid = await bcrypt.compare(login.password, user.password)

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
