import { Module } from '@nestjs/common'
import { UsersModule } from '@src/users/users.module'
import { ProjectsModule } from './projects/projects.module'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [UsersModule, ProjectsModule, AuthModule],
  controllers: [],
  providers: []
})
export class AppModule {}
