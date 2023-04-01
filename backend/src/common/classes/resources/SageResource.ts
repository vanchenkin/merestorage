import { ResourceInterface } from "./types/ResourceInterface";
import { SageConnection } from "./types/connections/sageConnection";
import { BadRequestException } from "@nestjs/common";
import { MetricDataType } from "./types/resourceMapper";
import { MetricType } from "../../../../../common/types/MetricType";

export class SageResource implements ResourceInterface {
    readonly bearer: string;

    constructor({ bearer }: SageConnection) {
        this.bearer = bearer;
    }

    async checkConnection(): Promise<void> {
        const res = await fetch(
            "https://ds-ui.sage.tcsbank.ru/mage/api/search",
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this.bearer}`,
                    Source: `merestorage`,
                },
                body: JSON.stringify({
                    query: 'group="cobrowsing"',
                    size: 0,
                    startTime: "2019-08-24T14:15:22Z",
                    endTime: "2019-08-24T14:15:22Z",
                }),
            }
        );
        const json = await res.json();

        if (json.error) {
            throw new BadRequestException(json.error);
        }
    }

    async getData(
        query: Record<string, any>,
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
