import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from './key/jwt-key'
import { CreateUserUseCase } from '@/use-cases/auth/create-user.user-case'
import { LoginUserUseCase } from '@/use-cases/auth/login-user.user-case'
import { UsersRepository } from '@/core/repositories/users.repository'
import { UsersMemoryRepository } from '@/infra/data/user-memory.repository'

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' }
    })
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: UsersRepository,
      useClass: UsersMemoryRepository
    },
    CreateUserUseCase,
    LoginUserUseCase
  ]
})
export class AuthModule {}
