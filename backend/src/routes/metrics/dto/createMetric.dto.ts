import {
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
} from "class-validator";
import { MetricType } from "@prisma/client";
import { Trim } from "../../../common/decorators/trim.decorator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateMetricDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @Trim()
    @IsNotEmpty()
    readonly description: string;

    @IsString()
    @Trim()
    @IsOptional()
    readonly cron: string;

    @IsNumber()
    readonly resourceId: number;

    @IsEnum(MetricType)
    @ApiProperty({
        enum: MetricType,
    })
    readonly type: MetricType;

    @IsString()
    @Trim()
    @IsNotEmpty()
    readonly query: string;
}
