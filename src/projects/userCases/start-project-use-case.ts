import { Injectable } from '@nestjs/common'
import { Project } from '../entities/project.entity'
import { ProjectsRepository } from '../project.repository'
import { StartProjectDTO } from '../dto/start-project.dto'

@Injectable()
export class StartProjectUseCase {
  constructor(private readonly projectsRepository: ProjectsRepository) {}

  execute(input: StartProjectDTO): Project {
    const project = this.projectsRepository.getById(input.id)
    project.start(input.started_at)
    return project
  }
}
