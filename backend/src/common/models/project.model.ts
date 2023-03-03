import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { Model } from "objection";
import { BaseModel } from "./base.model";
import { Resource } from "./resource.model";

export class Project extends BaseModel {
    static get tableName() {
        return "projects";
    }

    @IsString()
    @ApiProperty()
    name: string;

    static relationMappings = {
        resources: {
            relation: Model.HasManyRelation,
            modelClass: Resource,
            join: {
                from: "projects.id",
                to: "resources.project_id",
            },
        },
    };
}
