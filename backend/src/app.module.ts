import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrometheusModule } from "@willsoto/nestjs-prometheus";
import { LoggerModule } from "nestjs-pino";
import { PrometheusModule as PromModule } from "./common/modules/prometheus/prometheus.module";
import configurations from "./config/configurations";
import { LoggerConfig } from "./config/logger/logger.config";
import { MetricsConfig } from "./config/metrics/metrics.config";
import { ProjectsModule } from "./routes/projects/projects.module";
import { HealthModule } from "./routes/health/health.module";
import { ResourcesModule } from "./routes/resources/resources.module";
import { PrismaModule } from "./common/modules/database/prisma.module";
import { MetricsModule } from "./routes/metrics/metrics.module";
import { PgBossModule } from "./common/modules/pgboss/pgboss.module";
import { ReportsModule } from "./routes/reports/reports.module";
import { ReportRowsModule } from "./routes/reportRows/reportRows.module";

@Module({
    imports: [
        PromModule,
        PrometheusModule.register(MetricsConfig),
        LoggerModule.forRoot(LoggerConfig),
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configurations],
            envFilePath: ".env",
        }),
        HealthModule,
        PrismaModule,
        PgBossModule,
        // роуты
        ProjectsModule,
        ResourcesModule,
        MetricsModule,
        ReportsModule,
        ReportRowsModule,
    ],
    controllers: [],
})
export class AppModule {}
