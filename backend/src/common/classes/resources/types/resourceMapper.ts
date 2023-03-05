import { ResourceType } from "@prisma/client";
import { PostgresResource } from "../PostgresResource";
import { CassandraConnection } from "./connections/cassandraConnection";
import { PostgresConnection } from "./connections/postgresConnection";
import { SageConnection } from "./connections/sageConnection";

export const ResourceTypeConnectionMapper = {
    [ResourceType.Postgres]: PostgresConnection,
    [ResourceType.Cassandra]: CassandraConnection,
    [ResourceType.Sage]: SageConnection,
};

export const ResourceTypeClassMapper: Record<ResourceType, any> = {
    [ResourceType.Postgres]: PostgresResource,
    [ResourceType.Cassandra]: PostgresResource,
    [ResourceType.Sage]: PostgresResource,
};

export type ConnectionData =
    (typeof ResourceTypeConnectionMapper)[ResourceType];
