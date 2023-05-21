import { Controller, Get, Inject } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { HealthCheck, HealthCheckService } from "@nestjs/terminus";
import { DatabaseHealthIndicator } from "./databaseHealth.service";

@ApiTags("healtz")
@Controller("")
export class HealthController {
    constructor(
        @Inject(HealthCheckService) private health: HealthCheckService,
        @Inject(DatabaseHealthIndicator) private db: DatabaseHealthIndicator
    ) {}

    @Get("/healthz")
    @HealthCheck()
    healthz() {
        return this.health.check([() => this.db.isHealthy("database")]);
    }

    @Get("/readyz")
    @HealthCheck()
    readinez() {
        return this.health.check([() => this.db.isHealthy("database")]);
    }
}
