import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException
} from '@nestjs/common'
import { Response } from 'express'
import { ModelValidationExceptionFactory } from '../custom/model-validation.exception'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const status = exception.getStatus()
    const exceptionResponse = exception.getResponse() as any

    let validationErrors = null

    if (exception instanceof ModelValidationExceptionFactory) {
      const exceptionResponse = exception.getResponse() as any

      validationErrors = exceptionResponse['validation-errors'].map((error) => {
        const validationError = { ...error }
        delete validationError['contexts']
        return validationError
      })
    }

    response.status(status).json({
      statusCode: status,
      error: exceptionResponse.message,
      'validation-erros': validationErrors ?? undefined
    })
  }
}
