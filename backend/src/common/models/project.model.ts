import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { BaseModel } from "./base.model";

export class Project extends BaseModel {
    static get tableName() {
        return "projects";
    }

    @IsString()
    @ApiProperty()
    name: string;
}
