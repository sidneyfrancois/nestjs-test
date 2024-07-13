import { Inject, Injectable } from '@nestjs/common'
import { Project } from '../entities/project.entity'
import { StartProjectDTO } from '../dto/start-project.dto'
import { IProjectRepository } from '../project.repository'

@Injectable()
export class StartProjectUseCase {
  constructor(
    @Inject('IProjectRepository')
    private readonly projectsRepository: IProjectRepository
  ) {}

  execute(input: StartProjectDTO): Project {
    const project = this.projectsRepository.getById(input.id)
    project.start(input.started_at)
    return project
  }
}
