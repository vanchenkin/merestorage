import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ScheduleModule } from "@nestjs/schedule";
import { PrometheusModule } from "@willsoto/nestjs-prometheus";
import { LoggerModule } from "nestjs-pino";
import { MetricsModule } from "./common/modules/metrics/metrics.module";
import configurations from "./config/configurations";
import { LoggerConfig } from "./config/logger/logger.config";
import { MetricsConfig } from "./config/metrics/metrics.config";
import { ProjectsModule } from "./routes/projects/projects.module";
import { HealthModule } from "./routes/health/health.module";
import { ResourcesModule } from "./routes/resources/resources.module";

@Module({
    imports: [
        MetricsModule,
        PrometheusModule.register(MetricsConfig),
        LoggerModule.forRoot(LoggerConfig),
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configurations],
            envFilePath: ".env",
        }),
        ScheduleModule.forRoot(),
        HealthModule,
        // роуты
        ProjectsModule,
        ResourcesModule,
    ],
    controllers: [],
})
export class AppModule {}
