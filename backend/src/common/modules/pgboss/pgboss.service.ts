import { Injectable, Logger, OnModuleDestroy } from "@nestjs/common";
import PgBoss from "pg-boss";

const PostgresMaxConnections = 2;
const PostgresArchiveAfterSeconds = 30 * 60; // 30 minutes
const PostgresDeleteArchivedAfterSeconds = 6 * 60 * 60; // 6 hours

@Injectable()
export class PgBossService implements OnModuleDestroy {
    private readonly logger = new Logger(PgBossService.name);

    private readonly instance: PgBoss;

    constructor() {
        this.instance = new PgBoss({
            connectionString: process.env.POSTGRES_URL,
            max: PostgresMaxConnections,
            archiveCompletedAfterSeconds: PostgresArchiveAfterSeconds,
            deleteAfterSeconds: PostgresDeleteArchivedAfterSeconds,
        });

        this.instance.on("error", (error: Error) => {
            this.logger.error({ error: error.message }, "queue error");
        });

        this.instance.start();
    }

    onModuleDestroy() {
        this.instance.stop({ destroy: true, graceful: true });
    }

    getInstance(): PgBoss {
        return this.instance;
    }
}
