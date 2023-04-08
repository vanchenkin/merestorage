import { PostgresConnection } from "./types/connections/postgresConnection";
import { ResourceInterface } from "./types/ResourceInterface";
import { Client } from "pg";
import { PostgresQueryType } from "./types/queries/PostgresQueryType";
import { MetricDataType } from "./types/resourceMapper";
import { MetricType } from "../../../../../common/types/MetricType";

export class PostgresResource implements ResourceInterface<PostgresQueryType> {
    readonly url: string;
    readonly connection: Client;

    constructor({ url }: PostgresConnection) {
        this.url = url;

        this.connection = new Client(url);
    }

    async checkConnection(): Promise<void> {
        await this.connection.connect();
        await this.connection.query("SELECT 1");
    }

    async getData(
        query: PostgresQueryType,
        type: MetricType
    ): Promise<MetricDataType> {
        await this.connection.connect();
        await this.connection.query(
            "SET SESSION CHARACTERISTICS AS TRANSACTION READ ONLY"
        );
        const { rows, rowCount } = await this.connection.query(
            query.string,
            undefined
        );
        try {
            if (type === MetricType.Number) {
                if (rowCount !== 1)
                    throw new Error("Должен быть только один ряд");

                const values = Object.values(rows[0]);
                if (values.length !== 1)
                    throw new Error("Должна быть только 1 колонка");

                const firstValue = Object.values(values)[0] as number;

                if (isNaN(firstValue)) throw new Error("Не число");

                return firstValue;
            } else if (type === MetricType.Object) {
                if (Object.values(rows[0]).length !== 2)
                    throw new Error("Должно быть только 2 колонки");

                const data = rows.reduce((prev, row) => {
                    const values = Object.values(row);

                    if (typeof values[0] !== "string")
                        throw new Error(
                            "Тип левой колонки должен быть строкой"
                        );

                    return {
                        ...prev,
                        [values[0]]: values[1],
                    };
                }, {});

                return data;
            }
        } finally {
            this.connection.end();
        }

        throw new Error("Type not implemented");
    }
}
