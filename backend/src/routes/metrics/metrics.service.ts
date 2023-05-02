import {
    BadRequestException,
    Injectable,
    Logger,
    NotFoundException,
} from "@nestjs/common";
import { Metric, MetricData, Project } from "@prisma/client";
import { MetricType } from "../../../../common/types/MetricType";
import {
    MetricDataType,
    QueryType,
} from "../../../../common/types/resources/resourceMapper";
import { PrismaService } from "../../common/modules/database/prisma.service";
import { PgBossService } from "../../common/modules/pgboss/pgboss.service";
import { ResourcesService } from "../resources/resources.service";
import { UpsertMetricDto } from "./dto/upsertMetric.dto";

@Injectable()
export class MetricsService {
    private readonly logger = new Logger(MetricsService.name);

    constructor(
        private db: PrismaService,
        private readonly resourcesService: ResourcesService,
        private readonly pgBossService: PgBossService
    ) {
        this.consumeSchedules();
    }

    async get(id: number): Promise<Metric> {
        const metric = await this.db.metric.findUnique({ where: { id } });
        if (!metric) {
            throw new NotFoundException("Метрика не найдена");
        }
        return metric;
    }

    async getByName(name: string): Promise<Metric> {
        const metric = await this.db.metric.findFirst({ where: { name } });
        if (!metric) {
            throw new NotFoundException(`Метрика ${name} не найдена`);
        }
        return metric;
    }

    async getByProject(project: Project): Promise<Metric[]> {
        return await this.db.metric.findMany({
            where: { project },
            include: {
                resource: {
                    select: {
                        name: true,
                    },
                },
            },
        });
    }

    async upsert(project: Project, metric: UpsertMetricDto): Promise<Metric> {
        const foundMetric = await this.db.metric.findFirst({
            where: {
                name: metric.name,
                project: {
                    id: project.id,
                },
                NOT: {
                    id: metric.id,
                },
            },
        });

        if (foundMetric) {
            throw new BadRequestException(
                "Метрика с таким именем уже существует"
            );
        }

        const upsertedMetric: Metric = await this.db.metric.upsert({
            create: {
                ...metric,
                project: {
                    connect: { id: project.id },
                },
                resource: {
                    connect: { id: metric.resourceId },
                },
                resourceId: undefined,
                id: undefined,
            },
            update: {
                ...metric,
            },
            where: {
                id: metric.id ?? 0,
            },
        });

        if (upsertedMetric.cron) {
            await this.pgBossService
                .getInstance()
                .schedule(
                    `metric:${upsertedMetric.id}`,
                    upsertedMetric.cron,
                    undefined,
                    { tz: "Europe/Moscow" }
                );
        } else {
            await this.pgBossService
                .getInstance()
                .unschedule(`metric:${upsertedMetric.id}`);
        }

        this.logger.log({ name: upsertedMetric.name }, "metric upserted");

        return upsertedMetric;
    }

    async remove(id: number): Promise<void> {
        await this.get(id);
        await this.db.metric.delete({ where: { id } });
        await this.pgBossService.getInstance().unschedule(`metric:${id}`);

        this.logger.log({ id }, "metric removed");
    }

    async collectAndStore(metricId: number): Promise<MetricDataType> {
        const metric = await this.get(metricId);

        const value = await this.executeMetricQuery(
            metric.resourceId,
            metric.type,
            metric.query as QueryType
        );

        await this.db.metricData.create({
            data: {
                data: value,
                metric: {
                    connect: { id: metric.id },
                },
            },
        });

        this.logger.log({ metricId, metricName: metric.name, value }, "metric");

        return value;
    }

    async executeMetricQuery(
        resourceId: number,
        type: MetricType,
        query: QueryType
    ): Promise<MetricDataType> {
        const resource = await this.resourcesService.get(resourceId);

        const resourceEntity =
            this.resourcesService.createResourceEntityFromModel(resource);

        try {
            return await resourceEntity.getData(query, type);
        } catch (e: any) {
            throw new BadRequestException(e.message);
        }
    }

    async consumeSchedules(): Promise<void> {
        this.pgBossService.getInstance().work("metric:*", {}, async (job) => {
            const metricId = +job.name.substring("metric:".length);

            try {
                await this.collectAndStore(metricId);
            } catch (e) {
                this.logger.log({ metricId }, "metric consume failed");

                throw e;
            }
        });
    }

    async getMetricData(
        metricId: number,
        page = 1,
        pageCount = 0
    ): Promise<MetricData[]> {
        return await this.db.metricData.findMany({
            where: {
                metric: {
                    id: metricId,
                },
            },
            skip: pageCount * (page - 1),
            take: pageCount || undefined,
            orderBy: {
                createdAt: "desc",
            },
        });
    }

    async getMetricDataCount(metricId: number): Promise<number> {
        return await this.db.metricData.count({
            where: {
                metric: {
                    id: metricId,
                },
            },
        });
    }

    async removeMetricData(id: number): Promise<void> {
        const metricData = await this.db.metricData.findFirst({
            where: {
                id,
            },
        });
        if (!metricData) {
            throw new NotFoundException("Данные не найдены");
        }

        await this.db.metricData.delete({ where: { id } });
    }
}
