import {
    BadRequestException,
    Injectable,
    Logger,
    NotFoundException,
} from "@nestjs/common";
import { Metric, Project } from "@prisma/client";
import { MetricType } from "../../../../common/types/MetricType";
import { QueryType } from "../../common/classes/resources/types/resourceMapper";
import { PrismaService } from "../../common/modules/database/prisma.service";
import { ResourcesService } from "../resources/resources.service";
import { UpsertMetricDto } from "./dto/upsertMetric.dto";

@Injectable()
export class MetricsService {
    private readonly logger = new Logger(MetricsService.name);

    constructor(
        private db: PrismaService,
        private readonly resourcesService: ResourcesService
    ) {}

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
        const upsertedMetric = await this.db.metric.upsert({
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

        this.logger.log({ name: upsertedMetric.name }, "metric upserted");

        return upsertedMetric;
    }

    async remove(id: number): Promise<void> {
        await this.get(id);
        await this.db.metric.delete({ where: { id } });

        this.logger.log({ id }, "metric removed");
    }

    async checkQuery(
        resourceId: number,
        type: MetricType,
        query: QueryType
    ): Promise<string> {
        const resourceEntity = await this.resourcesService.get(resourceId);
        const resource =
            this.resourcesService.createResourceClassFromModel(resourceEntity);

        try {
            return JSON.stringify(await resource.getData(query, type));
        } catch (e: any) {
            throw new BadRequestException(e.message);
        }
    }
}
