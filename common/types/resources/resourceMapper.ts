import { MetricType } from "../MetricType";
import { ResourceType } from "../ResourceType";
import { CassandraQueryType } from "./queries/CassandraQueryType";
import { PostgresQueryType } from "./queries/PostgresQueryType";
import { SageQueryType } from "./queries/SageQueryType";

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
