import {
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsObject,
    IsOptional,
    IsString,
    NotContains,
    Validate,
} from "class-validator";
import { Trim } from "../../../common/decorators/trim.decorator";
import { ApiProperty } from "@nestjs/swagger";
import { CronValidator } from "../../../common/validators/CronValidator";
import { MetricType } from "../../../../../common/types/MetricType";
import { QueryType } from "../../../../../common/types/resources/resourceMapper";

export class CreateMetricDto {
    @IsString()
    @Trim()
    @IsNotEmpty()
    @NotContains(" ", {
        message: "Имя метрики не должно содержать пробелы",
    })
    readonly name: string;

    @IsOptional()
    @IsString()
    @Trim()
    readonly description?: string | undefined;

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
    readonly query: QueryType;
}
