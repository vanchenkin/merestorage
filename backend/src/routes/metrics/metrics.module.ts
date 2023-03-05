import { Module } from "@nestjs/common";
import { MetricsService } from "./metrics.service";
import { MetricsController } from "./metrics.controller";
import { ProjectsService } from "../projects/projects.service";

@Module({
    controllers: [MetricsController],
    providers: [MetricsService, ProjectsService],
})
export class MetricsModule {}
