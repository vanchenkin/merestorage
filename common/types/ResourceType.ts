import type { ResourceType as ResourceTypeOrigin } from "@prisma/client";

export const ResourceType: { [k in ResourceTypeOrigin]: k } = {
    Cassandra: "Cassandra",
    Postgres: "Postgres",
    Sage: "Sage",
} as const;

export type ResourceType = ResourceTypeOrigin;
