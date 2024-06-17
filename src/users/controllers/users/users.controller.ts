import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDTO } from 'src/users/dtos/create.user.dto';

@Controller('users')
export class UsersController {
  @Get()
  getUsers(
    @Query('sortBy') sortyBy: string,
    @Query('sortDesc', ParseBoolPipe) sortDesc: boolean,
  ) {
    console.log(sortyBy);
    console.log(typeof sortyBy);
    console.log(sortDesc);
    console.log(typeof sortDesc);
    return {
      username: 'sidney',
      email: 'sidney@email.com',
    };
  }

  @Get('posts')
  getUsersPosts() {
    return [
      {
        username: 'sidney',
        email: 'sidney@email.com',
        posts: [
          {
            id: 1,
            title: 'post 1',
          },
          {
            id: 2,
            title: 'post 2',
          },
        ],
      },
    ];
  }

  @Post('create')
  @HttpCode(201)
  @UsePipes(new ValidationPipe())
  createUser(@Body() userData: CreateUserDTO) {
    return userData;
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    console.log(id);
    console.log(typeof id);
    return id;
  }
}
