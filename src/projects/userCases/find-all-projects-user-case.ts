import { Inject, Injectable } from '@nestjs/common'
import { Project } from '../entities/project.entity'
import { IProjectRepository } from '../project.repository'

@Injectable()
export class FindAllProjectsUseCase {
  constructor(
    @Inject('IProjectRepository')
    private readonly projectsRepository: IProjectRepository
  ) {}

  execute(): Project[] {
    return this.projectsRepository.getAll()
  }
}
