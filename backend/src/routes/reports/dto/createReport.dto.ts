import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { Trim } from "../../../common/decorators/trim.decorator";
import { ReportRowDto } from "./reportRow.dto";

export class CreateReportDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @Trim()
    @IsNotEmpty()
    readonly description: string;

    @ValidateNested({ each: true })
    @IsArray()
    @Type(() => ReportRowDto)
    readonly rows: ReportRowDto[];
}
