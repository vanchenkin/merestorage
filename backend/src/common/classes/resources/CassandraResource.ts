import { ResourceInterface } from "./types/ResourceInterface";
import { CassandraConnection } from "./types/connections/cassandraConnection";

export class CassandraResource implements ResourceInterface {
    readonly url: string;

    constructor({ url }: CassandraConnection) {
        this.url = url;
    }

    async checkConnection() {
        return;
    }
}
