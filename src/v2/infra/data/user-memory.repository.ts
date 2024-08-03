import { UserEntity } from '@/core/domain/entities/user.entity'
import { UsersRepository } from '@/core/repositories/users.repository'
import { RepositoryCacheMemory } from '@/infra/data/repository-in-memory'

export class UsersMemoryRepository
  extends RepositoryCacheMemory<UserEntity>
  implements UsersRepository {}
