import { Controller, Post, Body } from '@nestjs/common'
import { AuthService } from './auth.service'
import { UserLoginDTO } from './dto/user-login.dto'
import { CreateUserRequest } from '@src/users/validations/user.create.validation'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async authenticate(@Body() login: UserLoginDTO) {
    return await this.authService.login(login)
  }

  @Post('signin')
  async register(@Body() user: CreateUserRequest) {
    return await this.authService.signIn(user)
  }
}
