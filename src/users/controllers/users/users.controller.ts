import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query
} from '@nestjs/common'
import { UsersService } from '@src/users/services/users/users.service'
import { CreateUserRequest } from '@src/users/validations/user.create.validation'
import { GetUsersQueryFilters } from '@src/users/validations/user.filters.validations'

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  getUsers(@Query() queryParams: GetUsersQueryFilters) {
    return this.userService.findAll(queryParams)
  }

  @Post('create')
  @HttpCode(201)
  createUser(@Body() userData: CreateUserRequest) {
    return this.userService.create(userData)
  }

  @Get(':id')
  getUserById(@Param('id') id: number) {
    return id
  }
}
