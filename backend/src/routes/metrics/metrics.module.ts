import { Module } from "@nestjs/common";
import { MetricsService } from "./metrics.service";
import { MetricsController } from "./metrics.controller";
import { ProjectsService } from "../projects/projects.service";
import { ResourcesService } from "../resources/resources.service";
import { PgBossService } from "../../common/modules/pgboss/pgboss.service";

@Module({
    controllers: [MetricsController],
    providers: [
        MetricsService,
        ProjectsService,
        ResourcesService,
        PgBossService,
    ],
    exports: [MetricsService, ResourcesService],
})
export class MetricsModule {}
