import { ApiProperty } from "@nestjs/swagger";
import {
    IsEnum,
    IsNotEmpty,
    IsObject,
    IsOptional,
    IsString,
} from "class-validator";
import { QueryType } from "../../../../../common/types/reports/grammarMapper";
import { ReportRowType } from "../../../../../common/types/ReportRowType";

import { Trim } from "../../../common/decorators/trim.decorator";

export class ReportRowDto {
    @IsString()
    @Trim()
    @IsNotEmpty()
    readonly name: string;

    @IsOptional()
    @IsString()
    @Trim()
    readonly description?: string | undefined;

    @IsEnum(ReportRowType)
    @ApiProperty({
        enum: ReportRowType,
    })
    readonly type: ReportRowType;

    @IsObject()
    readonly query: QueryType;
}
