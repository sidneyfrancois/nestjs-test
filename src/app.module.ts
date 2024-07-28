import { Logger, Module } from '@nestjs/common'
import { UsersModule } from '@src/users/users.module'
import { ProjectsModule } from './projects/projects.module'
import { AuthModule } from './auth/auth.module'
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core'
import { AuthGuard } from './guards/auth.guard'
import { RoleGuard } from './guards/role.guard'
import { LoggingInterceptor } from './interceptors/logger.interceptor'
import { ErrorsInterceptor } from './interceptors/errors.interceptor'
import { HttpExceptionFilter } from './errors/filters/exception.filter'

@Module({
  imports: [UsersModule, ProjectsModule, AuthModule],
  controllers: [],
  providers: [
    Logger,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorsInterceptor
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter
    }
  ]
})
export class AppModule {}
