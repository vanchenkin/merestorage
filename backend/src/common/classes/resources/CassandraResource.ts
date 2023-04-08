import { ResourceInterface } from "./types/ResourceInterface";
import { CassandraConnection } from "./types/connections/cassandraConnection";
import { CassandraQueryType } from "./types/queries/CassandraQueryType";
import { MetricDataType } from "./types/resourceMapper";
import { MetricType } from "../../../../../common/types/MetricType";

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
        // if (type === MetricType.Number) {
        //     return;
        // } else if (type === MetricType.Object) {
        //     return;
        // }
        throw new Error("Type not implemented");
    }
}
