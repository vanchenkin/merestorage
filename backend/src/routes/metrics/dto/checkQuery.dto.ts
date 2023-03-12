import { IsEnum, IsNumber, IsObject } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { QueryType } from "../../../common/classes/resources/types/resourceMapper";
import { MetricType } from "../../../../../common/types/MetricType";

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
