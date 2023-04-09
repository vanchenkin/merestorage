import { IsEnum, IsString } from "class-validator";
import { ReportRowType } from "../../../../../common/types/ReportRow/ReportRowType";

export class QueryDto {
    @IsString()
    readonly string: string;

    @IsEnum(ReportRowType)
    readonly type: ReportRowType;
}
