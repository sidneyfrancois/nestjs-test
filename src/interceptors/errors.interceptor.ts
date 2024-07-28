import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger
} from '@nestjs/common'
import { ModelValidationExceptionFactory } from '@src/errors/custom/model-validation.exception'
import { Observable } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { Request } from 'express'

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  constructor(private readonly logger: Logger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: Request = context.switchToHttp().getRequest()
    const className = context.getClass().name
    const handlerName = context.getHandler().name

    return next.handle().pipe(
      catchError((error: any) => {
        const errorLog = {
          timestamp: new Date().toISOString(),
          method: request.method,
          controller: className,
          handler: handlerName,
          path: request.path,
          'query-params': request.query,
          params: request.params,
          body: request.body,
          origin: request.headers['user-agent']
        }

        let errorContext = className

        if (error instanceof ModelValidationExceptionFactory) {
          errorLog['validation-errors'] = error.getResponse()
          errorContext = 'MODEL_VALIDATION'
        }

        errorLog['validation-errors'] = error.getResponse()

        this.logger.error(JSON.stringify(errorLog), error.stack, errorContext)
        // just in local, in production use stringify
        // this.logger.error(errorLog, error.stack, errorContext)
        throw error
      })
    )
  }
}
