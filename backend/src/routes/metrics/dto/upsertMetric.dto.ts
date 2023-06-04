import { IsNumber, IsOptional } from "class-validator";
import { CreateMetricDto } from "./createMetric.dto";

export class UpsertMetricDto extends CreateMetricDto {
    @IsNumber()
    @IsOptional()
    id?: number;
}
