import { Model } from "objection";

export class BaseModel extends Model {
    static get idColumn() {
        return "id";
    }
}
