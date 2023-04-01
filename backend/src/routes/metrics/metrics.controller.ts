import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    ParseIntPipe,
    UseGuards,
    HttpCode,
    Put,
} from "@nestjs/common";
import { MetricsService } from "./metrics.service";
import { ApiNotFoundResponse, ApiTags } from "@nestjs/swagger";
import { Metric, MetricData, Project } from "@prisma/client";
import { RetrievedProject } from "../projects/decorators/project.decorator";
import { RetrieveProjectGuard } from "../projects/guards/project.guard";
import { MetricIdDto } from "./dto/metricId.dto";
import { CheckQueryDto } from "./dto/checkQuery.dto";
import { UpsertMetricDto } from "./dto/upsertMetric.dto";
import { MetricDataType } from "../../common/classes/resources/types/resourceMapper";

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
     * Изменить или создать метрику
     */
    @UseGuards(RetrieveProjectGuard("id", new ParseIntPipe()))
    @Put("projects/:id/metrics")
    async upsert(
        @Param("id") id: number,
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
    remove(@Body() { id }: MetricIdDto): Promise<void> {
        return this.metricsService.remove(id);
    }

    /**
     * Проверка запроса
     */
    @Post("metric/check_query")
    @HttpCode(200)
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
     * Собрать и сохранить метрику
     */
    @Post("metric/store")
    @HttpCode(200)
    store(@Body() { id }: MetricIdDto): Promise<MetricDataType> {
        return this.metricsService.storeMetricData(id);
    }

    /**
     * Получить все данные по метрике
     */
    @Post("metric/:id/data")
    @HttpCode(200)
    getMetricData(@Body() { id }: MetricIdDto): Promise<MetricData[]> {
        return this.metricsService.getMetricData(id);
    }
}
