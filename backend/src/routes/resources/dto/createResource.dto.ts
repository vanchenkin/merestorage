import {
    IsEnum,
    IsNotEmpty,
    IsObject,
    IsOptional,
    IsString,
    ValidateNested,
} from "class-validator";
import { Trim } from "../../../common/decorators/trim.decorator";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
    ConnectionData,
    ResourceTypeConnectionMapper,
} from "../../../common/classes/resources/types/resourceFabricMapper";
import { ResourceType } from "../../../../../common/types/ResourceType";

export class CreateResourceDto {
    @IsString()
    @Trim()
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @Trim()
    @IsNotEmpty()
    @IsOptional()
    readonly description?: string | undefined;

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
