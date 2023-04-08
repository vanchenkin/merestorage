import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    ParseIntPipe,
    Post,
    UseGuards,
} from "@nestjs/common";
import { ApiNotFoundResponse, ApiTags } from "@nestjs/swagger";
import { Project, Resource } from "@prisma/client";
import { RetrievedProject } from "../projects/decorators/project.decorator";
import { RetrieveProjectGuard } from "../projects/guards/project.guard";
import { CheckResourceDto } from "./dto/checkResource.dto";
import { CreateResourceDto } from "./dto/createResource.dto";
import { RemoveResourceDto } from "./dto/removeResource.dto";

import { ResourcesService } from "./resources.service";

@ApiTags("resources")
@Controller()
export class ResourcesController {
    constructor(private readonly resourcesService: ResourcesService) {}

    /**
     * Получить все ресурсы проекта
     */
    @UseGuards(RetrieveProjectGuard("id", new ParseIntPipe()))
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
    async get(@Param("id", ParseIntPipe) id: number): Promise<Resource> {
        return this.resourcesService.get(id);
    }

    /**
     * Создать ресурс
     */
    @UseGuards(RetrieveProjectGuard("id", new ParseIntPipe()))
    @Post("projects/:id/resources")
    create(
        @Param("id") id: number,
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

    /**
     * Проверка ресурса
     */
    @Post("resource/check_credentials")
    @HttpCode(200)
    async check(
        @Body() { type, credentials }: CheckResourceDto
    ): Promise<{ message: string; statusCode: number }> {
        return {
            message: JSON.stringify(
                await this.resourcesService.checkByCredentials(
                    type,
                    credentials
                )
            ),
            statusCode: 200,
        };
    }
}
