import { PrometheusOptions } from "@willsoto/nestjs-prometheus";

export const MetricsConfig: PrometheusOptions = {
    defaultLabels: {
        system: "merestorage",
        inst: process.env.POD_NAME,
        env: process.env.NODE_ENV || "dev",
        group: "merestorage",
    },
    path: "prometheus",
};
