import { Module } from '@nestjs/common'
import { ProjectsService } from './projects.service'
// import { ProjectsController } from './projects.controller'
import { ProjectsMemoryRepository } from './project.memory.repository'
import { CreateProjectUseCase } from './userCases/create-project-use-case'
import { ProjectsControllerUseCase } from './project.user-case.controller'
import { FindAllProjectsUseCase } from './userCases/find-all-projects-user-case'
import { StartProjectUseCase } from './userCases/start-project-use-case'

@Module({
  controllers: [
    // ProjectsController,
    ProjectsControllerUseCase
  ],
  providers: [
    ProjectsService,
    ProjectsMemoryRepository,
    CreateProjectUseCase,
    FindAllProjectsUseCase,
    StartProjectUseCase,
    {
      provide: 'IProjectRepository',
      useClass: ProjectsMemoryRepository
    }
  ]
})
export class ProjectsModule {}
