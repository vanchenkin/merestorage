import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    UseGuards,
} from "@nestjs/common";
import {
    ApiBadRequestResponse,
    ApiNotFoundResponse,
    ApiTags,
} from "@nestjs/swagger";
import { Project } from "../../common/models/project.model";
import { Resource } from "../../common/models/resource.model";
import { RetrievedProject } from "../projects/decorators/project.decorator";
import { RetrieveProjectGuard } from "../projects/guards/project.guard";
import { CreateResourceDto } from "./dto/createResource.dto";
import { RemoveResourceDto } from "./dto/removeProject.dto";

import { ResourcesService } from "./resources.service";

@ApiTags("resources")
@Controller()
export class ResourcesController {
    constructor(private readonly resourcesService: ResourcesService) {}

    /**
     * Получить все ресурсы проекта
     */
    @UseGuards(RetrieveProjectGuard("id"))
    @Get("projects/:id/resources")
    async getAll(
        @Param("id") id: number,
        @RetrievedProject() project: Project
    ): Promise<Resource[]> {
        return this.resourcesService.getByProject(project);
    }

    /**
     * Получить ресурс по id
     */
    @Get("resources/:id")
    @ApiNotFoundResponse({
        description: "Ресурс не найден",
    })
    async get(@Param("id") id: number): Promise<Resource> {
        return this.resourcesService.get(id);
    }

    /**
     * Создать ресурс
     */
    @UseGuards(RetrieveProjectGuard("id"))
    @Post("projects/:id/resources")
    @ApiBadRequestResponse({
        description: "Имя процесса должно быть уникальным",
    })
    create(
        @Body() resource: CreateResourceDto,
        @RetrievedProject() project: Project
    ): Promise<Resource> {
        return this.resourcesService.create(project, resource);
    }

    /**
     * Удалить ресурс
     */
    @Delete("resources")
    @ApiNotFoundResponse({
        description: "Ресурс не найден",
    })
    remove(@Body() { id }: RemoveResourceDto): Promise<void> {
        return this.resourcesService.remove(id);
    }
}
