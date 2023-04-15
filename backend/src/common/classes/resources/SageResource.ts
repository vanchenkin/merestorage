import { ResourceInterface } from "./types/ResourceInterface";
import { SageConnection } from "./types/connections/sageConnection";
import { BadRequestException } from "@nestjs/common";
import { MetricType } from "../../../../../common/types/MetricType";
import { Config } from "../../../config/config";
import { SageQueryType } from "../../../../../common/types/resources/queries/SageQueryType";
import { MetricDataType } from "../../../../../common/types/resources/resourceMapper";

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
    ): Promise<Record<string, unknown>> {
        const res = await fetch(Config.SageApi, {
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

    private getStartTime(start: string): Date {
        let startTime: Date;

        if (start.startsWith("-")) {
            startTime = new Date();

            const lastChar = start[start.length - 1];
            const offset = +start.substring(1, start.length - 1);

            if (lastChar === "m") {
                startTime.setMinutes(-offset);
            } else if (lastChar === "h") {
                startTime.setHours(-offset);
            } else if (lastChar === "d") {
                startTime.setDate(-offset);
            } else {
                startTime = new Date(start);
            }
        } else {
            startTime = new Date(start);
        }

        return startTime;
    }

    private getEndTime(end: string): Date {
        let endTime: Date;
        if (end === "now") endTime = new Date();
        else endTime = new Date(end);

        return endTime;
    }

    async getData(
        query: SageQueryType,
        type: MetricType
    ): Promise<MetricDataType> {
        const startTime = this.getStartTime(query.startTime);

        const endTime = this.getEndTime(query.endTime);

        const res = await this.fetchApi({
            string: query.string,
            startTime,
            endTime,
            size: +query.size,
        });

        if (res.error) {
            throw new BadRequestException(res.error);
        }

        const hits = res.hits as Record<string, unknown>[];

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

            const data = hits.reduce<Record<string, number>>((prev, row) => {
                const values = Object.values(row);

                if (typeof values[1] !== "number") {
                    throw new Error(
                        "Значения во второй колонке должны быть числами"
                    );
                }

                return {
                    ...prev,
                    [values[0] as string]: values[1],
                };
            }, {});

            return data;
        }

        throw new Error("Type not implemented");
    }
}
