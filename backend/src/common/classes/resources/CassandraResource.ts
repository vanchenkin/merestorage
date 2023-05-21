import { ResourceInterface } from "./types/ResourceInterface";
import { CassandraConnection } from "./types/connections/cassandraConnection";
import { CassandraQueryType } from "../../../../../common/types/resources/queries/CassandraQueryType";
import { MetricType } from "../../../../../common/types/MetricType";
import { MetricDataType } from "../../../../../common/types/resources/resourceMapper";

export class CassandraResource
    implements ResourceInterface<CassandraQueryType>
{
    readonly url: string;

    constructor({ url }: CassandraConnection) {
        this.url = url;
    }

    async checkConnection(): Promise<void> {
        return;
    }

    async getData(
        query: CassandraQueryType,
        type: MetricType
    ): Promise<MetricDataType> {
        throw new Error("Type not implemented");
    }
}
