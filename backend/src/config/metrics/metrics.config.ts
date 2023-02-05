export const MetricsConfig = {
    defaultLabels: {
        system: "merestorage",
        inst: process.env.POD_NAME,
        env: process.env.NODE_ENV || "dev",
        group: "merestorage",
    },
};
