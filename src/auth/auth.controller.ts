import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
  UsePipes
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { UserLoginDTO } from './dto/user-login.dto'
import { CurrentUser } from '@src/decorators/user.decorator'
import { Public } from '@src/decorators/public.decorator'
import { Roles } from '@src/decorators/role.decorator'
import { IsUserAlreadyExistsPipe } from '@src/users/pipes/validate-exist-user.pipe'
import { CreateUserValidator } from '@src/shared/validators/user/create-user-validator'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('profile')
  @Roles(['admin'])
  getProfile(
    // @CurrentUser() user: User,
    @CurrentUser('username') username: string,
    @CurrentUser('name') name: string
  ) {
    console.log('username: ', username)
    console.log('name', name)
    // return user
  }

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  async authenticate(@Body() login: UserLoginDTO) {
    return await this.authService.login(login)
  }

  @Public()
  @Post('signin')
  @UsePipes(IsUserAlreadyExistsPipe)
  async register(@Body() user: CreateUserValidator) {
    return await this.authService.signIn(user)
  }
}
