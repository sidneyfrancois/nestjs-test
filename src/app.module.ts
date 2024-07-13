import { Module } from '@nestjs/common'
import { UsersModule } from '@src/users/users.module'
import { ProjectsModule } from './projects/projects.module'
import { AuthModule } from './auth/auth.module'
import { APP_GUARD } from '@nestjs/core'
import { AuthGuard } from './guards/auth.guard'
import { RoleGuard } from './guards/role.guard'

@Module({
  imports: [UsersModule, ProjectsModule, AuthModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard
    }
  ]
})
export class AppModule {}
