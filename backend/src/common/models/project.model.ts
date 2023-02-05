import { BaseModel } from "./base.model";

export class Project extends BaseModel {
    static get tableName() {
        return "projects";
    }

    static get idColumn() {
        return "id";
    }

    name: string;
}
