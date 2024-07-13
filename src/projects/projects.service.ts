import { Inject, Injectable } from '@nestjs/common'
import { CreateProjectDto } from './dto/create-project.dto'
import { UpdateProjectDto } from './dto/update-project.dto'
import { Project, ProjectStatus } from './entities/project.entity'
import { v4 as uuidv4 } from 'uuid'
import { plainToInstance } from 'class-transformer'
import { IProjectRepository } from './project.repository'

@Injectable()
export class ProjectsService {
  constructor(
    @Inject('IProjectRepository')
    private readonly projectsRepository: IProjectRepository
  ) {}

  create(createProjectDto: CreateProjectDto) {
    const projectId = uuidv4()
    let status = ProjectStatus.Pending

    if (createProjectDto.started_at) status = ProjectStatus.Active

    const newProject = { id: projectId, ...createProjectDto, status }
    const project = plainToInstance(Project, newProject)
    return this.projectsRepository.create(project)
  }

  findAll() {
    return this.projectsRepository.getAll()
  }

  findOne(id: string) {
    return this.projectsRepository.getById(id)
  }

  update(id: string, updateProjectDto: UpdateProjectDto) {
    const project = this.projectsRepository.getById(id)
    updateProjectDto.name && (project.name = updateProjectDto.name)
    updateProjectDto.description &&
      (project.description = updateProjectDto.description)

    if (updateProjectDto.started_at) {
      if (project.status === ProjectStatus.Active)
        throw new Error('Cannot start activated project.')

      if (project.status === ProjectStatus.Completed)
        throw new Error('Cannot start completed project.')

      if (project.status === ProjectStatus.Cancelled)
        throw new Error('Cannot start cancelled project.')

      project.started_at = updateProjectDto.started_at
      project.status = ProjectStatus.Active
    }

    if (updateProjectDto.cancelled_at) {
      if (project.status === ProjectStatus.Completed)
        throw new Error('Cannot cancel completed project.')

      if (project.status === ProjectStatus.Cancelled)
        throw new Error('Cannot cancel cancelled project.')

      if (updateProjectDto.cancelled_at < project.started_at)
        throw new Error('Cannot cancel project before it started.')

      project.cancelled_at = updateProjectDto.cancelled_at
      project.status = ProjectStatus.Cancelled
    }

    if (updateProjectDto.finished_at) {
      if (project.status === ProjectStatus.Completed)
        throw new Error('Cannot finished completed project.')

      if (project.status === ProjectStatus.Cancelled)
        throw new Error('Cannot finish cancelled project.')

      if (updateProjectDto.finished_at < project.started_at)
        throw new Error('Cannot finish project before it started.')

      project.finished_at = updateProjectDto.finished_at
      project.status = ProjectStatus.Completed
    }

    return this.projectsRepository.update(id, project)
  }

  remove(id: string) {
    return this.projectsRepository.deleteById(id)
  }
}
