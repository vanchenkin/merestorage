import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsObject, IsString } from "class-validator";
import { ReportRowType } from "../../../../../common/types/ReportRow/ReportRowType";
import { Trim } from "../../../common/decorators/trim.decorator";

export class ReportRowDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @Trim()
    @IsNotEmpty()
    readonly description: string;

    @IsEnum(ReportRowType)
    @ApiProperty({
        enum: ReportRowType,
    })
    readonly type: ReportRowType;

    @IsObject()
    readonly query: Record<string, any>;
}
