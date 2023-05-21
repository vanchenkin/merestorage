import { IsEnum, IsObject, ValidateNested } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
    ConnectionData,
    ResourceTypeConnectionMapper,
} from "../../../common/classes/resources/types/resourceFabricMapper";
import { ResourceType } from "../../../../../common/types/ResourceType";

export class CheckResourceDto {
    @IsEnum(ResourceType)
    @ApiProperty({
        enum: ResourceType,
    })
    readonly type: ResourceType;

    @IsObject()
    @ValidateNested()
    @Type((data) => {
        return ResourceTypeConnectionMapper[data?.object.type as ResourceType];
    })
    readonly credentials: ConnectionData;
}
