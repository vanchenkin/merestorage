import { join } from "path";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ScheduleModule } from "@nestjs/schedule";
import { ServeStaticModule } from "@nestjs/serve-static";
import { PrometheusModule } from "@willsoto/nestjs-prometheus";
import { LoggerModule } from "nestjs-pino";
import { MetricsModule } from "./common/modules/metrics/metrics.module";
import configurations from "./config/configurations";
import { LoggerConfig } from "./config/logger/logger.config";
import { MetricsConfig } from "./config/metrics/metrics.config";
import { ProjectModule } from "./routes/projects/projects.module";
import { HealthModule } from "./routes/health/health.module";

@Module({
    imports: [
        MetricsModule,
        PrometheusModule.register(MetricsConfig),
        LoggerModule.forRoot(LoggerConfig),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, "../../client"),
            exclude: ["api/*"],
        }),
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configurations],
            envFilePath: ".env",
        }),
        ScheduleModule.forRoot(),
        ProjectModule,
        HealthModule,
    ],
    controllers: [],
})
export class AppModule {}
