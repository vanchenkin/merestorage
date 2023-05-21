import { Type } from "class-transformer";
import {
    IsArray,
    IsNotEmpty,
    IsOptional,
    IsString,
    ValidateNested,
} from "class-validator";
import { Trim } from "../../../common/decorators/trim.decorator";
import { ReportRowDto } from "./reportRow.dto";

export class CreateReportDto {
    @IsString()
    @Trim()
    @IsNotEmpty()
    readonly name: string;

    @IsOptional()
    @IsString()
    @Trim()
    readonly description?: string | undefined;

    @ValidateNested({ each: true })
    @IsArray()
    @Type(() => ReportRowDto)
    readonly rows: ReportRowDto[];
}
