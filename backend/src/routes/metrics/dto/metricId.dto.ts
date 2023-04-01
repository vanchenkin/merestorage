import { IsNumber } from "class-validator";

export class MetricIdDto {
    @IsNumber()
    readonly id: number;
}
