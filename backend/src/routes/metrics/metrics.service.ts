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
} from "../../common/classes/resources/types/resourceMapper";
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

    async storeMetricData(metricId: number): Promise<MetricDataType> {
        const metric = await this.get(metricId);

        const data = await this.executeMetricQuery(
            metric.resourceId,
            metric.type,
            metric.query as QueryType
        );

        await this.db.metricData.create({
            data: {
                data: data,
                metric: {
                    connect: { id: metric.id },
                },
            },
        });

        this.logger.log({ metricId, value: data }, "metric");
        return data;
    }

    async executeMetricQuery(
        resourceId: number,
        type: MetricType,
        query: QueryType
    ): Promise<MetricDataType> {
        const resourceEntity = await this.resourcesService.get(resourceId);
        const resource =
            this.resourcesService.createResourceClassFromModel(resourceEntity);

        try {
            return await resource.getData(query, type);
        } catch (e: any) {
            throw new BadRequestException(e.message);
        }
    }

    async consumeSchedules(): Promise<void> {
        this.pgBossService.getInstance().work("metric:*", {}, async (job) => {
            try {
                await this.storeMetricData(
                    +job.name.substring("metric:".length)
                );
            } catch (e) {
                job.done(e as Error);
            }
        });
    }

    async getMetricData(metricId: number): Promise<MetricData[]> {
        return this.db.metricData.findMany({
            where: {
                metric: {
                    id: metricId,
                },
            },
        });
    }
}
