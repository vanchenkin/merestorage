import { ResourceInterface } from "./types/ResourceInterface";
import { SageConnection } from "./types/connections/sageConnection";
import { BadRequestException } from "@nestjs/common";
import { MetricDataType } from "./types/resourceMapper";
import { MetricType } from "../../../../../common/types/MetricType";
import { Config } from "../../../config/config";
import { SageQueryType } from "./types/queries/SageQueryType";

type SageFetchQuery = {
    string: string;
    startTime: Date;
    endTime: Date;
    size: number;
};

export class SageResource implements ResourceInterface<SageQueryType> {
    readonly bearer: string;

    constructor({ bearer }: SageConnection) {
        this.bearer = bearer;
    }

    private async fetchApi(
        sageQuery: SageFetchQuery
    ): Promise<Record<string, any>> {
        const res = await fetch(Config.sageApi, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.bearer}`,
                Source: `merestorage`,
            },
            body: JSON.stringify({
                size: +sageQuery.size,
                startTime: sageQuery.startTime.toISOString(),
                endTime: sageQuery.endTime.toISOString(),
                query: sageQuery.string,
            }),
        });

        return res.json();
    }

    async checkConnection(): Promise<void> {
        const res = await this.fetchApi({
            string: 'group="cobrowsing"', // доступ только для тех у кого есть доступ в кобраузинг TODO: поменять
            startTime: new Date(),
            endTime: new Date(),
            size: 0,
        });

        if (res.error) {
            throw new BadRequestException(res.error);
        }
    }

    async getData(
        query: SageQueryType,
        type: MetricType
    ): Promise<MetricDataType> {
        let startTime: Date;
        if (query.startTime.startsWith("-")) {
            startTime = new Date();
            const lastChar = query.startTime[query.startTime.length - 1];
            const offset = +query.startTime.substring(
                1,
                query.startTime.length - 1
            );
            if (lastChar === "m") {
                startTime.setMinutes(-offset);
            } else if (lastChar === "h") {
                startTime.setHours(-offset);
            } else if (lastChar === "d") {
                startTime.setDate(-offset);
            } else {
                startTime = new Date(query.startTime);
            }
        } else {
            startTime = new Date(query.startTime);
        }

        let endTime: Date;
        if (query.endTime === "now") endTime = new Date();
        else endTime = new Date(query.endTime);

        const res = await this.fetchApi({
            string: query.string, // доступ только для тех у кого есть доступ в кобраузинг TODO: поменять
            startTime,
            endTime,
            size: +query.size,
        });

        if (res.error) {
            throw new BadRequestException(res.error);
        }

        const hits = res.hits as Record<string, any>[];

        if (type === MetricType.Number) {
            if (hits.length !== 1)
                throw new Error("Должен быть только один ряд");

            const values = Object.values(hits[0]);
            if (values.length !== 1)
                throw new Error("Должна быть только 1 колонка");

            const firstValue = Object.values(values)[0] as number;

            if (isNaN(firstValue)) throw new Error("Не число");

            return firstValue;
        } else if (type === MetricType.Object) {
            if (Object.values(hits[0]).length !== 2)
                throw new Error("Должно быть только 2 колонки");

            const data = hits.reduce((prev, row) => {
                const values = Object.values(row);
                return {
                    ...prev,
                    [values[0]]: values[1],
                };
            }, {});

            return data;
        }

        throw new Error("Type not implemented");
    }
}
