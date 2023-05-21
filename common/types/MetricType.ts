export const MetricType = {
    Number: "Number",
    Object: "Object",
} as const;

export type MetricType = (typeof MetricType)[keyof typeof MetricType];
