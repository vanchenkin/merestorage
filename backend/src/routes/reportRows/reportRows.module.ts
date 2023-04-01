import { Module } from "@nestjs/common";
import { ReportsService } from "../reports/reports.service";
import { ReportRowsController } from "./reportRows.controller";
import { ReportRowsService } from "./reportRows.service";

@Module({
    controllers: [ReportRowsController],
    providers: [ReportRowsService, ReportsService],
})
export class ReportRowsModule {}
