import { MetricType } from "../../../../../../common/types/MetricType";
import { ResourceType } from "../../../../../../common/types/ResourceType";
import { CassandraResource } from "../CassandraResource";
import { PostgresResource } from "../PostgresResource";
import { SageResource } from "../SageResource";
import { CassandraConnection } from "./connections/cassandraConnection";
import { PostgresConnection } from "./connections/postgresConnection";
import { SageConnection } from "./connections/sageConnection";
import { CassandraQueryType } from "./queries/CassandraQueryType";
import { PostgresQueryType } from "./queries/PostgresQueryType";
import { SageQueryType } from "./queries/SageQueryType";

export const ResourceTypeConnectionMapper = {
    [ResourceType.Postgres]: PostgresConnection,
    [ResourceType.Cassandra]: CassandraConnection,
    [ResourceType.Sage]: SageConnection,
};

export const ResourceTypeClassMapper: Record<ResourceType, any> = {
    [ResourceType.Postgres]: PostgresResource,
    [ResourceType.Cassandra]: CassandraResource,
    [ResourceType.Sage]: SageResource,
};

export type ConnectionData =
    (typeof ResourceTypeConnectionMapper)[ResourceType];

export type MetricDataTypeMapper = {
    [MetricType.Number]: number;
    [MetricType.Object]: Record<string, number>;
};

export type ResourceQueryTypeMapper = {
    [ResourceType.Postgres]: PostgresQueryType;
    [ResourceType.Cassandra]: CassandraQueryType;
    [ResourceType.Sage]: SageQueryType;
};

export type QueryType = ResourceQueryTypeMapper[ResourceType];
export type MetricDataType = MetricDataTypeMapper[MetricType];
