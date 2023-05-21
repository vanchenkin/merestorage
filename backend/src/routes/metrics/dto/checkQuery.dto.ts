import { IsEnum, IsNumber, IsObject } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { MetricType } from "../../../../../common/types/MetricType";
import { QueryType } from "../../../../../common/types/resources/resourceMapper";

export class CheckQueryDto {
    @IsEnum(MetricType)
    @ApiProperty({
        enum: MetricType,
    })
    readonly type: MetricType;

    @IsNumber()
    readonly resourceId: number;

    @IsObject()
    readonly query: QueryType;
}
