import { Module } from "@nestjs/common";
import { ProjectsService } from "../projects/projects.service";
import { ReportsController } from "./reports.controller";
import { ReportsService } from "./reports.service";

@Module({
    controllers: [ReportsController],
    providers: [ReportsService, ProjectsService],
})
export class ReportsModule {}
