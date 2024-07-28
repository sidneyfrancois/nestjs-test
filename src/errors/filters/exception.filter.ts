import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException
} from '@nestjs/common'
import { Response } from 'express'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const status = exception.getStatus()

    const exceptionResponse = exception.getResponse() as Array<any>

    const validationErrors = exceptionResponse.map((error) => {
      const validationError = { ...error }
      delete validationError['contexts']
      return validationError
    })

    response.status(status).json({
      statusCode: status,
      error: 'erro na validação de usuário',
      'validation-erros': validationErrors
    })
  }
}
