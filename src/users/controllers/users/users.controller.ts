import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query
} from '@nestjs/common'
import { Roles } from '@src/decorators/role.decorator'
import { FetchUser } from '@src/users/pipes/fetch.user.pipe'
import { UsersService } from '@src/users/services/users/users.service'
import { CreateUserRequest } from '@src/users/validations/user.create.validation'
import { GetUsersQueryFilters } from '@src/users/validations/user.filters.validations'

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  getUsers(@Query() queryParams: GetUsersQueryFilters): any[] {
    return this.userService.findAll(queryParams)
  }

  @Post('create')
  @Roles(['admin'])
  @HttpCode(201)
  createUser(@Body() userData: CreateUserRequest): any {
    return this.userService.create(userData)
  }

  @Get(':id')
  getUserById(@Param('id', FetchUser) user: any): any {
    console.log('user: ', user)
    return user
  }
}
