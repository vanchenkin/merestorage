import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { Metric, Project } from "@prisma/client";
import { PrismaService } from "../../common/modules/database/prisma.service";
import { CreateMetricDto } from "./dto/createMetric.dto";
import { UpdateMetricDto } from "./dto/updateMetric.dto";

@Injectable()
export class MetricsService {
    private readonly logger = new Logger(MetricsService.name);

    constructor(private db: PrismaService) {}

    async create(project: Project, metric: CreateMetricDto): Promise<Metric> {
        const createdMetric = await this.db.metric.create({
            data: {
                project: {
                    connect: { id: project.id },
                },
                resource: {
                    connect: { id: metric.resourceId },
                },
                ...metric,
                resourceId: undefined,
            },
        });

        this.logger.log({ name: createdMetric.name }, "metric created");

        return createdMetric;
    }

    async patch(id: number, metric: UpdateMetricDto): Promise<Metric> {
        await this.get(id);
        const updatedMetric = await this.db.metric.update({
            where: { id },
            data: metric,
        });
        return updatedMetric;
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

    async remove(id: number): Promise<void> {
        await this.get(id);
        await this.db.metric.delete({ where: { id } });
    }
}
