import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  Inject
} from '@nestjs/common'
import { CreateProjectDto } from './dto/create-project.dto'
import { CreateProjectUseCase } from './userCases/create-project-use-case'
import { Project } from './entities/project.entity'
import { FindAllProjectsUseCase } from './userCases/find-all-projects-user-case'
import { UpdateProjectDto } from './dto/update-project.dto'
import { StartProjectUseCase } from './userCases/start-project-use-case'

@Controller('projects')
export class ProjectsControllerUseCase {
  @Inject(CreateProjectUseCase)
  private readonly createProjectUseCase: CreateProjectUseCase

  @Inject(FindAllProjectsUseCase)
  private readonly findAllProjectsUseCase: FindAllProjectsUseCase

  @Inject(StartProjectUseCase)
  private readonly startProjectUseCase: StartProjectUseCase

  @Get()
  findAll(): Project[] {
    return this.findAllProjectsUseCase.execute()
  }

  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.createProjectUseCase.execute(createProjectDto)
  }

  @Patch(':id/start')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.startProjectUseCase.execute({ id, ...updateProjectDto })
  }
}
