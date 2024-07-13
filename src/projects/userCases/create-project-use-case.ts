import { Injectable } from '@nestjs/common'
import { CreateProjectDto } from '../dto/create-project.dto'
import { Project } from '../entities/project.entity'
import { ProjectsRepository } from '../project.repository'
import { plainToInstance } from 'class-transformer'

@Injectable()
export class CreateProjectUseCase {
  constructor(private readonly projectsRepository: ProjectsRepository) {}

  execute(input: CreateProjectDto): Project {
    const project = plainToInstance(Project, input)
    return this.projectsRepository.create(project)
  }
}
