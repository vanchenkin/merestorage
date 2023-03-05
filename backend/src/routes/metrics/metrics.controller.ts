import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    ParseIntPipe,
    UseGuards,
    Patch,
} from "@nestjs/common";
import { MetricsService } from "./metrics.service";
import { CreateMetricDto } from "./dto/createMetric.dto";
import { UpdateMetricDto } from "./dto/updateMetric.dto";
import { ApiNotFoundResponse, ApiTags } from "@nestjs/swagger";
import { Metric, Project } from "@prisma/client";
import { RetrievedProject } from "../projects/decorators/project.decorator";
import { RetrieveProjectGuard } from "../projects/guards/project.guard";
import { RemoveMetricDto } from "./dto/removeMetric.dto";

@ApiTags("metrics")
@Controller()
export class MetricsController {
    constructor(private readonly metricsService: MetricsService) {}

    /**
     * Получить все метрики проекта
     */
    @UseGuards(RetrieveProjectGuard("id", new ParseIntPipe()))
    @Get("projects/:id/metrics")
    async getAll(
        @Param("id") id: number,
        @RetrievedProject() project: Project
    ): Promise<Metric[]> {
        return this.metricsService.getByProject(project);
    }

    /**
     * Получить метрику по id
     */
    @Get("metrics/:id")
    @ApiNotFoundResponse({
        description: "Метрика не найдена",
    })
    async get(@Param("id", ParseIntPipe) id: number): Promise<Metric> {
        return this.metricsService.get(id);
    }

    /**
     * Изменить метрику по id
     */
    @Patch("metrics/:id")
    @ApiNotFoundResponse({
        description: "Метрика не найдена",
    })
    async update(
        @Param("id", ParseIntPipe) id: number,
        @Body() metric: UpdateMetricDto
    ): Promise<Metric> {
        return this.metricsService.patch(id, metric);
    }

    /**
     * Создать метрику
     */
    @UseGuards(RetrieveProjectGuard("id", new ParseIntPipe()))
    @Post("projects/:id/metrics")
    create(
        @Param("id") id: number,
        @Body() metric: CreateMetricDto,
        @RetrievedProject() project: Project
    ): Promise<Metric> {
        return this.metricsService.create(project, metric);
    }

    /**
     * Удалить метрику
     */
    @Delete("metrics")
    @ApiNotFoundResponse({
        description: "Метрика не найдена",
    })
    remove(@Body() { id }: RemoveMetricDto): Promise<void> {
        return this.metricsService.remove(id);
    }
}
