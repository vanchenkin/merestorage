import { IsEnum, IsObject, IsString, ValidateNested } from "class-validator";
import { ResourceType } from "@prisma/client";
import { Trim } from "../../../common/decorators/trim.decorator";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
    ConnectionData,
    ResourceTypeConnectionMapper,
} from "../types/resourceTypeConnectionMapper";

export class CreateResourceDto {
    @IsString()
    @Trim()
    readonly name: string;

    @IsString()
    @Trim()
    readonly description: string;

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
