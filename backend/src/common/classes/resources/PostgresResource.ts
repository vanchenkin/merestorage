import { PostgresConnection } from "./types/connections/postgresConnection";
import { ResourceInterface } from "./types/ResourceInterface";

export class PostgresResource implements ResourceInterface {
    readonly url: string;

    constructor({ url }: PostgresConnection) {
        this.url = url;
    }

    checkConnection = () => {
        return;
    };
}
