import { ResourceType } from "@prisma/client";
import { PostgresConnection } from "./postgresConnection";
import { SageConnection } from "./sageConnection";

export const ResourceTypeConnectionMapper = {
    [ResourceType.Postgres]: PostgresConnection,
    [ResourceType.Cassandra]: PostgresConnection,
    [ResourceType.Sage]: SageConnection,
};

export type ConnectionData =
    (typeof ResourceTypeConnectionMapper)[ResourceType];
