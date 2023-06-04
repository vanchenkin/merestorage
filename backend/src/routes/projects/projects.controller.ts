import { Body, Controller, Delete, Get, Post } from "@nestjs/common";
import {
    ApiBadRequestResponse,
    ApiNotFoundResponse,
    ApiTags,
} from "@nestjs/swagger";
import { Project } from "@prisma/client";
import { IdDto } from "../../common/dto/Id.dto";
import { CreateProjectDto } from "./dto/createProject.dto";
import { ProjectsService } from "./projects.service";

@ApiTags("projects")
@Controller("projects")
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) {}

    /**
     * Получить все проекты
     */
    @Get()
    async getAll(): Promise<Project[]> {
        return this.projectsService.getAll();
    }

    /**
     * Создать проект
     */
    @Post()
    @ApiBadRequestResponse({
        description: "Имя проекта должно быть уникальным",
    })
    create(@Body() project: CreateProjectDto): Promise<Project> {
        return this.projectsService.create(project);
    }

    /**
     * Удалить проект
     */
    @Delete()
    @ApiNotFoundResponse({
        description: "Проект не найден",
    })
    remove(@Body() { id }: IdDto): Promise<void> {
        return this.projectsService.remove(id);
    }
}
