import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common'
import { Public } from '@src/decorators/public.decorator'
import { CreateUserDTO } from '@/shared/dtos/create-user.dto'
import { CreateUserUseCase } from '@/use-cases/auth/create-user.user-case'
import { UserLoginDTO } from '@/shared/dtos/login-user.dto'
import { LoginUserUseCase } from '@src/v2/use-cases/auth/login-user.user-case'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly loginUseCase: LoginUserUseCase
  ) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  async authenticate(@Body() login: UserLoginDTO) {
    return await this.loginUseCase.execute(login)
  }

  @Public()
  @Post('signin')
  async register(@Body() user: CreateUserDTO) {
    return await this.createUserUseCase.execute(user)
  }
}
