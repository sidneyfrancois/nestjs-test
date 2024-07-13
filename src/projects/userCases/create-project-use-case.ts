import { Inject, Injectable } from '@nestjs/common'
import { CreateProjectDto } from '../dto/create-project.dto'
import { Project } from '../entities/project.entity'
import { plainToInstance } from 'class-transformer'
import { IProjectRepository } from '../project.repository'

@Injectable()
export class CreateProjectUseCase {
  constructor(
    @Inject('IProjectRepository')
    private readonly projectsRepository: IProjectRepository
  ) {}

  execute(input: CreateProjectDto): Project {
    const project = plainToInstance(Project, input)
    return this.projectsRepository.create(project)
  }
}
