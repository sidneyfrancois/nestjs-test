import { HttpException, HttpStatus } from '@nestjs/common'
import { ValidationError } from 'class-validator'

export class ModelValidationExceptionFactory extends HttpException {
  constructor(invalidFields: ValidationError[]) {
    const validationErrors = invalidFields.map((fieldError) => ({
      property: fieldError.property,
      value: fieldError?.value ?? null,
      constraints: fieldError.constraints,
      contexts: {
        classValidationName: fieldError.target.constructor.name
      }
    }))
    super(
      {
        'validation-errors': validationErrors,
        message: invalidFields[0].target['getDefaultFormErrorMessage']()
      },
      HttpStatus.BAD_REQUEST
    )
  }
}
