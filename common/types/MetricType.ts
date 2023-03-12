import type { MetricType as MetricTypeOrigin } from "@prisma/client";

export const MetricType: { [k in MetricTypeOrigin]: k } = {
    Number: "Number",
    Object: "Object",
} as const;

export type MetricType = MetricTypeOrigin;
