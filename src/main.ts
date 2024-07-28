import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { useContainer, ValidationError } from 'class-validator'
import { ModelValidationExceptionFactory } from './errors/custom/model-validation.exception'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const customGlobalPipe = new ValidationPipe({
    transform: true,
    stopAtFirstError: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    validationError: {
      target: true,
      value: true
    },
    exceptionFactory: (validationErrors: ValidationError[] = []) => {
      return new ModelValidationExceptionFactory(validationErrors)
    }
  })

  app.useGlobalPipes(customGlobalPipe)
  useContainer(app.select(AppModule), { fallbackOnErrors: true })
  await app.listen(3000)
}
bootstrap()
