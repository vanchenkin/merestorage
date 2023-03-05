import { IsNumber } from "class-validator";

export class RemoveMetricDto {
    @IsNumber()
    readonly id: number;
}
