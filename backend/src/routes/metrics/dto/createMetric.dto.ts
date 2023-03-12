import {
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsObject,
    IsOptional,
    IsString,
    Validate,
} from "class-validator";
import { Trim } from "../../../common/decorators/trim.decorator";
import { ApiProperty } from "@nestjs/swagger";
import { CronValidator } from "../../../common/validators/CronValidator";
import { MetricType } from "../../../../../common/types/MetricType";

export class CreateMetricDto {
    @IsString()
    @Trim()
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @Trim()
    @IsNotEmpty()
    readonly description: string;

    @IsString()
    @Trim()
    @IsOptional()
    @Validate(CronValidator)
    readonly cron: string;

    @IsNumber()
    readonly resourceId: number;

    @IsEnum(MetricType)
    @ApiProperty({
        enum: MetricType,
    })
    readonly type: MetricType;

    @IsObject()
    readonly query: Record<string, any>;
}
