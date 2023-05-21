import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    UseGuards,
} from "@nestjs/common";
import { ApiNotFoundResponse, ApiTags } from "@nestjs/swagger";
import { Project, Resource } from "@prisma/client";
import { IdDto } from "../../common/dto/Id.dto";
import { RetrievedProject } from "../projects/decorators/project.decorator";
import { RetrieveProjectGuard } from "../projects/guards/project.guard";
import { CheckResourceDto } from "./dto/checkResource.dto";
import { CreateResourceDto } from "./dto/createResource.dto";
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
        @Param("id") _: number,
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
        @Param("id") _: number,
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
    remove(@Body() { id }: IdDto): Promise<void> {
        return this.resourcesService.remove(id);
    }

    /**
     * Проверка подключения
     */
    @Post("resources/check_credentials")
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
