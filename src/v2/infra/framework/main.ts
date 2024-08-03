import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Logger, ValidationPipe } from '@nestjs/common'
import { useContainer } from 'class-validator'

async function bootstrap() {
  const logger = new Logger('API')
  const app = await NestFactory.create(AppModule)
  const customGlobalPipe = new ValidationPipe({
    transform: true,
    stopAtFirstError: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    validationError: {
      target: true,
      value: true
    }
  })

  app.useGlobalPipes(customGlobalPipe)
  useContainer(app.select(AppModule), { fallbackOnErrors: true })
  logger.log('API started, version v2')
  await app.listen(3000)
}
bootstrap()
