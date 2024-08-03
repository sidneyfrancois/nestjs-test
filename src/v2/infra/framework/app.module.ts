import { Module } from '@nestjs/common'
import { AuthModule } from '@/infra/framework/auth/auth.module'

@Module({
  imports: [AuthModule]
})
export class AppModule {}
