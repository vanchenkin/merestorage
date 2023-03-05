import { PostgresConnection } from "./types/connections/postgresConnection";
import { ResourceInterface } from "./types/ResourceInterface";
import { Client } from "pg";

export class PostgresResource implements ResourceInterface {
    readonly url: string;
    readonly connection: Client;

    constructor({ url }: PostgresConnection) {
        this.url = url;

        this.connection = new Client(url);
    }

    async checkConnection() {
        await this.connection.connect();
        await this.connection.query("SELECT 1");
    }
}
