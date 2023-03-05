import { PartialType } from "@nestjs/swagger";
import { CreateMetricDto } from "./createMetric.dto";

export class UpdateMetricDto extends PartialType(CreateMetricDto) {}
