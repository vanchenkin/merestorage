import { Params } from "nestjs-pino";
import { version } from "../../../../package.json";

const getLocalTimestamp = (): string => {
    const offset = new Date().getTimezoneOffset() * 60000;
    return new Date(Date.now() - offset).toISOString().slice(0, -1);
};

export const LoggerConfig: Params = {
    pinoHttp: {
        timestamp: () => `,"@timestamp":"${getLocalTimestamp()}"`,
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
