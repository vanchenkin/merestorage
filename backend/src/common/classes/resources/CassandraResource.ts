import { ResourceInterface } from "./types/ResourceInterface";
import { CassandraConnection } from "./types/connections/cassandraConnection";
import { CassandraQueryType } from "./types/queries/CassandraQueryType";
import { DataType } from "./types/resourceMapper";
import { MetricType } from "../../../../../common/types/MetricType";

export class CassandraResource implements ResourceInterface {
    readonly url: string;

    constructor({ url }: CassandraConnection) {
        this.url = url;
    }

    async checkConnection(): Promise<void> {
        return;
    }

    async getData<T extends CassandraQueryType>(
        query: Record<string, any>,
        type: MetricType
    ): Promise<DataType> {
        throw new Error("Type not implemented");
    }
}
