import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { UserLoginDTO } from './dto/user-login.dto'
import { CreateUserRequest } from '@src/users/validations/user.create.validation'
import { CurrentUser } from '@src/decorators/user.decorator'
import { User } from '@src/users/entity/user'
import { Public } from '@src/decorators/public.decorator'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('profile')
  getProfile(
    @CurrentUser() user: User,
    @CurrentUser('username') username: string,
    @CurrentUser('name') name: string
  ) {
    console.log('username: ', username)
    console.log('name', name)
    return user
  }

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  async authenticate(@Body() login: UserLoginDTO) {
    return await this.authService.login(login)
  }

  @Public()
  @Post('signin')
  async register(@Body() user: CreateUserRequest) {
    return await this.authService.signIn(user)
  }
}
