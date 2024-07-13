import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  UseGuards
} from '@nestjs/common'
import { AuthGuard } from '@src/guards/auth.guard'
import { User } from '@src/users/entity/user'
import { FetchUser } from '@src/users/pipes/fetch.user.pipe'
import { UsersService } from '@src/users/services/users/users.service'
import { CreateUserRequest } from '@src/users/validations/user.create.validation'
import { GetUsersQueryFilters } from '@src/users/validations/user.filters.validations'

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  getUsers(@Query() queryParams: GetUsersQueryFilters): User[] {
    return this.userService.findAll(queryParams)
  }

  @Post('create')
  @HttpCode(201)
  createUser(@Body() userData: CreateUserRequest): User {
    return this.userService.create(userData)
  }

  @Get(':id')
  getUserById(@Param('id', FetchUser) user: User): User {
    console.log('user: ', user)
    return user
  }
}
