import {
    IsEnum,
    IsNotEmpty,
    IsObject,
    IsString,
    ValidateNested,
} from "class-validator";
import { ResourceType } from "@prisma/client";
import { Trim } from "../../../common/decorators/trim.decorator";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
    ConnectionData,
    ResourceTypeConnectionMapper,
} from "../../../common/classes/resources/types/resourceMapper";

export class CreateResourceDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @Trim()
    @IsNotEmpty()
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
