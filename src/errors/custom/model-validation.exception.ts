import { HttpException, HttpStatus } from '@nestjs/common'
import { ValidationError } from 'class-validator'

export class ModelValidationExceptionFactory extends HttpException {
  constructor(invalidFields: ValidationError[]) {
    const validationErrors = invalidFields.map((fieldError) => ({
      property: fieldError.property,
      value: fieldError?.value ?? null,
      constraints: fieldError.constraints,
      contexts: fieldError?.contexts ?? 'no contexts provided'
    }))
    super(validationErrors, HttpStatus.BAD_REQUEST)
  }
}
