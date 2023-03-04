import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
} from "@nestjs/common";
import {
    ApiBadRequestResponse,
    ApiNotFoundResponse,
    ApiTags,
} from "@nestjs/swagger";
import { Project } from "@prisma/client";
import { CreateProjectDto } from "./dto/createProject.dto";
import { RemoveProjectDto } from "./dto/removeProject.dto";
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
     * Получить проект по id
     */
    @Get(":id")
    @ApiNotFoundResponse({
        description: "Проект не найден",
    })
    async get(@Param("id", ParseIntPipe) id: number): Promise<Project> {
        return this.projectsService.get(id);
    }

    /**
     * Создать проект
     */
    @Post()
    @ApiBadRequestResponse({
        description: "Имя процесса должно быть уникальным",
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
    remove(@Body() { id }: RemoveProjectDto): Promise<void> {
        return this.projectsService.remove(id);
    }
}
