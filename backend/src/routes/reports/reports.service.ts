import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { Project, Report } from "@prisma/client";
import { ChartValue } from "../../../../common/types/ChartValue";
import { ReportRowType } from "../../../../common/types/ReportRowType";
import { PrismaService } from "../../common/modules/database/prisma.service";
import { QueryDto } from "./dto/query.dto";
import { UpsertReportDto } from "./dto/upsertReport.dto";
import { QueryResponse } from "../../../../common/types/reports/QueryResponse";

@Injectable()
export class ReportsService {
    private readonly logger = new Logger(ReportsService.name);

    constructor(private db: PrismaService) {}

    async upsert(project: Project, report: UpsertReportDto): Promise<Report> {
        const upsertedReport: Report = await this.db.report.upsert({
            create: {
                ...report,
                project: {
                    connect: { id: project.id },
                },
                id: undefined,
                rows: JSON.stringify(report.rows),
            },
            update: {
                ...report,
                rows: JSON.stringify(report.rows),
            },
            where: {
                id: report.id ?? 0,
            },
        });

        this.logger.log({ name: upsertedReport.name }, "report upserted");

        return upsertedReport;
    }

    async get(id: number): Promise<Report> {
        const report = await this.db.report.findUnique({ where: { id } });

        if (!report) {
            throw new NotFoundException("Отчет не найден");
        }

        report.rows = JSON.parse(report?.rows as string);
        return report;
    }

    async getByProject(project: Project): Promise<Report[]> {
        return (await this.db.report.findMany({ where: { project } })).map(
            (report) => ({
                ...report,
                rows: JSON.parse(report.rows as string),
            })
        );
    }

    async remove(id: number): Promise<void> {
        await this.get(id);
        await this.db.report.delete({ where: { id } });

        this.logger.log({ id }, "report removed");
    }

    async query(project: Project, query: QueryDto): Promise<QueryResponse> {
        const values: ChartValue[] = [
            {
                date: "2010-01",
                value: 1998,
            },
            {
                date: "2010-02",
                value: 1850,
            },
            {
                date: "2010-03",
                value: 1720,
            },
            {
                date: "2010-04",
                value: 1818,
            },
            {
                date: "2010-05",
                value: 1920,
            },
            {
                date: "2010-06",
                value: 1802,
            },
            {
                date: "2010-07",
                value: 1945,
            },
        ];
        if (query.type === ReportRowType.Number)
            return {
                type: query.type,
                hit: 200,
            };
        else
            return {
                type: query.type,
                hit: values,
            };
    }
}
