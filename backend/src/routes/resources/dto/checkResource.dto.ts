import { IsEnum, IsObject, ValidateNested } from "class-validator";
import { ResourceType } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
    ConnectionData,
    ResourceTypeConnectionMapper,
} from "../../../common/classes/resources/types/resourceMapper";

export class CheckResourceDto {
    @IsEnum(ResourceType)
    @ApiProperty({
        enum: ResourceType,
    })
    readonly type: ResourceType;

    @IsObject()
    @ValidateNested()
    @Type((type) => {
        return ResourceTypeConnectionMapper[type?.object.type as ResourceType];
    })
    readonly credentials: ConnectionData;
}
