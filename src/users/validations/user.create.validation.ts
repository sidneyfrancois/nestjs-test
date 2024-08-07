import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from 'class-validator'

export class CreateUserRequest {
  public getDefaultFormErrorMessage() {
    return {
      logMessage: 'error on user registration',
      clientMessage: 'erro no cadastro de usuário'
    }
  }

  @IsNotEmpty()
  firstName: string

  @IsNotEmpty()
  lastName: string

  @IsNotEmpty({
    message: 'idade nao pode ser vazia'
  })
  age: number

  @IsNotEmpty()
  email: string

  @IsNotEmpty()
  username: string

  @IsNotEmpty()
  password: string

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  roles: string[]
}
