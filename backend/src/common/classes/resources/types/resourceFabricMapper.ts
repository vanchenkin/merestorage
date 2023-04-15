import { ResourceType } from "../../../../../../common/types/ResourceType";
import { CassandraResource } from "../CassandraResource";
import { PostgresResource } from "../PostgresResource";
import { SageResource } from "../SageResource";
import { CassandraConnection } from "./connections/cassandraConnection";
import { PostgresConnection } from "./connections/postgresConnection";
import { SageConnection } from "./connections/sageConnection";

export const ResourceTypeConnectionMapper = {
    [ResourceType.Postgres]: PostgresConnection,
    [ResourceType.Cassandra]: CassandraConnection,
    [ResourceType.Sage]: SageConnection,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ResourceTypeClassMapper: Record<ResourceType, any> = {
    [ResourceType.Postgres]: PostgresResource,
    [ResourceType.Cassandra]: CassandraResource,
    [ResourceType.Sage]: SageResource,
};

export type ConnectionData =
    (typeof ResourceTypeConnectionMapper)[ResourceType];
