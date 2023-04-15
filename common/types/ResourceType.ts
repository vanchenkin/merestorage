export const ResourceType = {
    Cassandra: "Cassandra",
    Postgres: "Postgres",
    Sage: "Sage",
} as const;

export type ResourceType = (typeof ResourceType)[keyof typeof ResourceType];
