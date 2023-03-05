import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ScheduleModule } from "@nestjs/schedule";
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
        ScheduleModule.forRoot(),
        HealthModule,
        PrismaModule,
        // роуты
        ProjectsModule,
        ResourcesModule,
        MetricsModule,
    ],
    controllers: [],
})
export class AppModule {}
