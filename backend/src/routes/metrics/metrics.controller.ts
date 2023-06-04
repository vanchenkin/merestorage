import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    ParseIntPipe,
    UseGuards,
    Put,
    Query,
} from "@nestjs/common";
import { MetricsService } from "./metrics.service";
import {
    ApiBadRequestResponse,
    ApiNotFoundResponse,
    ApiTags,
} from "@nestjs/swagger";
import { Metric, MetricData, Project } from "@prisma/client";
import { RetrievedProject } from "../projects/decorators/project.decorator";
import { RetrieveProjectGuard } from "../projects/guards/project.guard";
import { CheckQueryDto } from "./dto/checkQuery.dto";
import { UpsertMetricDto } from "./dto/upsertMetric.dto";
import { IdDto } from "../../common/dto/Id.dto";
import { MetricDataType } from "../../../../common/types/resources/resourceMapper";

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
        @Param("id") _: number,
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
     * Изменить или создать метрику
     */
    @UseGuards(RetrieveProjectGuard("id", new ParseIntPipe()))
    @Put("projects/:id/metrics")
    @ApiBadRequestResponse({
        description: "Имя метрики должно быть уникальным в рамках проекта",
    })
    async upsert(
        @Param("id") _: number,
        @Body() metric: UpsertMetricDto,
        @RetrievedProject() project: Project
    ): Promise<Metric> {
        return this.metricsService.upsert(project, metric);
    }

    /**
     * Удалить метрику
     */
    @Delete("metrics")
    @ApiNotFoundResponse({
        description: "Метрика не найдена",
    })
    remove(@Body() { id }: IdDto): Promise<void> {
        return this.metricsService.remove(id);
    }

    /**
     * Проверка запроса
     */
    @Post("metrics/check_query")
    async check(
        @Body() { type, query, resourceId }: CheckQueryDto
    ): Promise<{ message: string; statusCode: number }> {
        return {
            message: JSON.stringify(
                await this.metricsService.executeMetricQuery(
                    resourceId,
                    type,
                    query
                )
            ),
            statusCode: 200,
        };
    }

    /**
     * Собрать и сохранить данные метрики
     */
    @Post("metrics/collect")
    collectAndStore(@Body() { id }: IdDto): Promise<MetricDataType> {
        return this.metricsService.collectAndStore(id);
    }

    /**
     * Получить данные по метрике
     */
    @Get("metrics/:id/data")
    async getMetricData(
        @Param("id", ParseIntPipe) id: number,
        @Query("page", ParseIntPipe) page: number,
        @Query("pageCount", ParseIntPipe) pageCount: number
    ): Promise<{ data: MetricData[]; total: number }> {
        return {
            data: await this.metricsService.getMetricData(id, {
                page,
                pageCount,
            }),
            total: await this.metricsService.getMetricDataCount(id),
        };
    }

    /**
     * Удалить данные по метрике
     */
    @Delete("metrics/data")
    @ApiNotFoundResponse({
        description: "Данные не найдены",
    })
    removeMetricData(@Body() { id }: IdDto): Promise<void> {
        return this.metricsService.removeMetricData(id);
    }
}
