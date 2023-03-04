import { IsString, Validate } from "class-validator";
import { IsPostgresString } from "../validators/isPostgresString.validator";

export class SageConnection {
    @IsString()
    @Validate(IsPostgresString)
    readonly url: string;
}
