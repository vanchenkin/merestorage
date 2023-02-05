import { Inject, Injectable } from "@nestjs/common";
import {
    HealthIndicatorResult,
    HealthIndicator,
    HealthCheckError,
} from "@nestjs/terminus";
import { Connection, KNEX_CONNECTION } from "@willsoto/nestjs-objection";

@Injectable()
export class DatabaseHealthIndicator extends HealthIndicator {
    constructor(@Inject(KNEX_CONNECTION) public connection: Connection) {
        super();
    }

    async ping(key = "db-primary"): Promise<HealthIndicatorResult> {
        try {
            await this.connection.raw("SELECT 1");
            return super.getStatus(key, true);
        } catch (error) {
            const status = super.getStatus(key, false, {
                message: (error as any).message,
            });
            throw new HealthCheckError("Unable to connect to database", status);
        }
    }
}
