import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsString, MaxLength } from "class-validator";
import { Model } from "objection";
import { BaseModel } from "./base.model";
import { Project } from "./project.model";

export enum ResourceType {
    Sage = "SAGE",
    Cassandra = "CASSANDRA",
    Postgres = "POSTGRES",
}

export class Resource extends BaseModel {
    static get tableName() {
        return "resources";
    }

    @MaxLength(40)
    @IsString()
    @ApiProperty()
    name: string;

    @MaxLength(255)
    @IsString()
    @ApiProperty()
    description: string;

    @IsNumber()
    @ApiProperty()
    projectId: number;

    @IsEnum(ResourceType)
    @ApiProperty({
        example: "SAGE",
    })
    type: ResourceType;

    credentials: string;

    static relationMappings = {
        project: {
            relation: Model.BelongsToOneRelation,
            modelClass: Project,
            join: {
                from: "resources.project_id",
                to: "projects.id",
            },
        },
    };
}
