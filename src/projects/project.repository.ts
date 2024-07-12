import { Injectable } from '@nestjs/common'
import { Project } from './entities/project.entity'

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

  create(project: Project): Project {
    this.projects.push(project)
    return project
  }
}
