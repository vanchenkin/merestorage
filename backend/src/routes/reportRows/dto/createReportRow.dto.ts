import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsObject, IsString } from "class-validator";
import { ReportTowType } from "../../../../../common/types/ReportRowType";
import { Trim } from "../../../common/decorators/trim.decorator";

export class CreateReportRowDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @Trim()
    @IsNotEmpty()
    readonly description: string;

    @IsEnum(ReportTowType)
    @ApiProperty({
        enum: ReportTowType,
    })
    readonly type: ReportTowType;

    @IsObject()
    readonly query: Record<string, any>;
}
