import { CreateUserDTO } from '@/shared/dtos/create-user.dto'
import { UsersRepository } from '@/core/repositories/users.repository'
import { UserEntity } from '@/core/domain/entities/user.entity'
import { Injectable } from '@nestjs/common'

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userRepository: UsersRepository) {}

  async execute(user: CreateUserDTO): Promise<CreateUserDTO> {
    const newUser = await UserEntity.create(user)
    console.log(this.userRepository)
    return await this.userRepository.create(newUser)
  }
}
