import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    UseGuards,
} from "@nestjs/common";
import { ApiNotFoundResponse, ApiTags } from "@nestjs/swagger";
import { Report, ReportRow } from "@prisma/client";
import { RetrievedReport } from "../reports/decorators/report.decorator";
import { RetrieveReportGuard } from "../reports/guards/report.guard";
import { CreateReportRowDto } from "./dto/createReportRow.dto";
import { ReportRowIdDto } from "./dto/reportRowId.dto";
import { ReportRowsService } from "./reportRows.service";

@ApiTags("reports/rows")
@Controller()
export class ReportRowsController {
    constructor(private readonly reportRowsService: ReportRowsService) {}

    /**
     * Получить все ряды отчета
     */
    @UseGuards(RetrieveReportGuard("id", new ParseIntPipe()))
    @Get("reports/:id/rows")
    async getAll(
        @Param("id") id: number,
        @RetrievedReport() report: Report
    ): Promise<ReportRow[]> {
        return this.reportRowsService.getByReport(report);
    }

    /**
     * Получить ряд по id
     */
    @Get("report_rows/:id")
    @ApiNotFoundResponse({
        description: "Ряд отчета не найден",
    })
    async get(@Param("id", ParseIntPipe) id: number): Promise<ReportRow> {
        return this.reportRowsService.get(id);
    }

    /**
     * Создать ряд отчета
     */
    @UseGuards(RetrieveReportGuard("id", new ParseIntPipe()))
    @Post("reports/:id/rows")
    create(
        @Param("id") id: number,
        @RetrievedReport() report: Report,
        @Body() reportRow: CreateReportRowDto
    ): Promise<ReportRow> {
        return this.reportRowsService.create(report, reportRow);
    }

    /**
     * Удалить ряд отчета
     */
    @Delete("report_rows")
    @ApiNotFoundResponse({
        description: "Ряд отчета не найден",
    })
    remove(@Body() { id }: ReportRowIdDto): Promise<void> {
        return this.reportRowsService.remove(id);
    }
}
