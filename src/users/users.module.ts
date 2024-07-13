import { Module } from '@nestjs/common'
import { UsersController } from './controllers/users/users.controller'
import { UsersService } from './services/users/users.service'
import { IsUserAlreadyExistConstraint } from './validations/custom-validations/user-already-exists'

@Module({
  controllers: [UsersController],
  providers: [UsersService, IsUserAlreadyExistConstraint],
  exports: [UsersService]
})
export class UsersModule {}
