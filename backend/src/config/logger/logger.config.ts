import { Params } from "nestjs-pino";
import { version } from "../../../../package.json";

export const LoggerConfig: Params = {
    pinoHttp: {
        timestamp: () => `,"@timestamp":"${new Date().toISOString()}"`,
        base: {
            system: "merestorage",
            inst: process.env.POD_NAME,
            version,
            env: process.env.NODE_ENV || "dev",
            group: "merestorage",
        },
        formatters: {
            level(label: string) {
                return { level: label };
            },
        },
        nestedKey: "payload",
        autoLogging: false,
    },
    renameContext: "class",
};
