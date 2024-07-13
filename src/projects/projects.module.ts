import { Module } from '@nestjs/common'
import { ProjectsService } from './projects.service'
// import { ProjectsController } from './projects.controller'
import { ProjectsRepository } from './project.repository'
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
    ProjectsRepository,
    CreateProjectUseCase,
    FindAllProjectsUseCase,
    StartProjectUseCase
  ]
})
export class ProjectsModule {}
