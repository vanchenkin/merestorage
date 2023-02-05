import { Injectable } from "@nestjs/common";
import { Gauge } from "prom-client";

type Metric = {
    name: string;
    description: string;
    getData: (this: Gauge<string>) => Promise<void>;
};

@Injectable()
export class MetricsService {
    async createMetric({ name, description, getData }: Metric): Promise<void> {
        new Gauge({
            name,
            help: description,
            async collect() {
                await getData.call(this);
            },
        });
    }
}
