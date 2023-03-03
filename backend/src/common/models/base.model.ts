import { Model } from "objection";

export class BaseModel extends Model {
    readonly created_at: Date;
}
