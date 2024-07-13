import { Project } from './entities/project.entity'

export interface IProjectRepository {
  create(project: Project): Project
  update(id: string, project: Project): Project
  getAll(): Project[]
  getById(id: string): Project
  deleteById(id: string): Project
}
