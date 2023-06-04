import { Module } from "@nestjs/common";
import { OhmModule } from "../../common/modules/ohm/ohm.module";
import { ProjectsService } from "../projects/projects.service";
import { ReportsController } from "./reports.controller";
import { ReportsService } from "./reports.service";

@Module({
    controllers: [ReportsController],
    providers: [ReportsService, ProjectsService],
    imports: [OhmModule],
})
export class ReportsModule {}
