import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { Project, Report } from "@prisma/client";
import { PrismaService } from "../../common/modules/database/prisma.service";
import { CreateReportDto } from "./dto/createReport.dto";

@Injectable()
export class ReportsService {
    private readonly logger = new Logger(ReportsService.name);

    constructor(private db: PrismaService) {}

    async create(project: Project, report: CreateReportDto): Promise<Report> {
        const createdReport = await this.db.report.create({
            data: {
                project: {
                    connect: { id: project.id },
                },
                ...report,
            },
        });

        this.logger.log({ name: createdReport.name }, "report created");

        return createdReport;
    }

    async get(id: number): Promise<Report> {
        const report = await this.db.report.findUnique({ where: { id } });
        if (!report) {
            throw new NotFoundException("Отчет не найден");
        }
        return report;
    }

    async getByProject(project: Project): Promise<Report[]> {
        return await this.db.report.findMany({ where: { project } });
    }

    async remove(id: number): Promise<void> {
        await this.get(id);
        await this.db.report.delete({ where: { id } });

        this.logger.log({ id }, "report removed");
    }
}
