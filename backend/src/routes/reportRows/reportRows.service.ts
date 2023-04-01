import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { Report, ReportRow } from "@prisma/client";
import { PrismaService } from "../../common/modules/database/prisma.service";
import { CreateReportRowDto } from "./dto/createReportRow.dto";

@Injectable()
export class ReportRowsService {
    private readonly logger = new Logger(ReportRowsService.name);

    constructor(private db: PrismaService) {}

    async create(
        report: Report,
        reportRow: CreateReportRowDto
    ): Promise<ReportRow> {
        const createdReportRow = await this.db.reportRow.create({
            data: {
                report: {
                    connect: { id: report.id },
                },
                ...reportRow,
                order: 1,
            },
        });

        this.logger.log({ name: createdReportRow.name }, "report row created");

        return createdReportRow;
    }

    async get(id: number): Promise<ReportRow> {
        const reportRow = await this.db.reportRow.findUnique({
            where: { id },
        });
        if (!reportRow) {
            throw new NotFoundException("Ряд отчета не найден");
        }
        return reportRow;
    }

    async getByReport(report: Report): Promise<ReportRow[]> {
        return await this.db.reportRow.findMany({ where: { report } });
    }

    async remove(id: number): Promise<void> {
        await this.get(id);
        await this.db.reportRow.delete({ where: { id } });

        this.logger.log({ id }, "report row removed");
    }
}
