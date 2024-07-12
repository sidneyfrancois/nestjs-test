import { Injectable } from '@nestjs/common'
import { CreateProjectDto } from './dto/create-project.dto'
import { Project, ProjectStatus } from './entities/project.entity'
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class ProjectsRepository {
  private readonly projects: Project[] = []

  getAll(): Project[] {
    return this.projects
  }

  getById(id: string): Project {
    return this.projects.find((project: Project) => project.id === id)
  }

  deleteById(id: string): Project {
    const index = this.projects.findIndex(
      (project: Project) => project.id === id
    )

    if (index !== -1) return this.projects.splice(index, 1)[0]
    return null
  }

  update(id: string, updatedProject: Project): Project {
    const project = this.projects.find((project: Project) => project.id === id)
    if (project) {
      Object.assign(project, updatedProject)
      return project
    }

    return null
  }

  create(project: CreateProjectDto): Project {
    const projectId = uuidv4()
    let status = ProjectStatus.Pending

    if (project.started_at) status = ProjectStatus.Active

    const newProject = { id: projectId, ...project, status }
    this.projects.push(newProject)

    return newProject as Project
  }
}
