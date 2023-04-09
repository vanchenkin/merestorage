import { IsNumber, IsOptional } from "class-validator";
import { CreateReportDto } from "./createReport.dto";

export class UpsertReportDto extends CreateReportDto {
    @IsNumber()
    @IsOptional()
    id?: number;
}
