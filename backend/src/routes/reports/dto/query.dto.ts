import { IsEnum, IsObject, IsOptional, IsString } from "class-validator";
import { ReportRowType } from "../../../../../common/types/ReportRowType";
import { QueryType } from "../../../../../common/types/reports/grammarMapper";

export class QueryDto {
    @IsObject()
    readonly query: QueryType;

    @IsEnum(ReportRowType)
    readonly type: ReportRowType;

    @IsString({ each: true })
    @IsOptional()
    readonly dateRange?: string[];
}
