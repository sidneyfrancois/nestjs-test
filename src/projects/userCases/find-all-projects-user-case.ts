import { Injectable } from '@nestjs/common'
import { Project } from '../entities/project.entity'
import { ProjectsRepository } from '../project.repository'

@Injectable()
export class FindAllProjectsUseCase {
  constructor(private readonly projectsRepository: ProjectsRepository) {}

  execute(): Project[] {
    return this.projectsRepository.getAll()
  }
}
