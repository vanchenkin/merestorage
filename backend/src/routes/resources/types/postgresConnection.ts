import { IsString, Validate } from "class-validator";
import { IsPostgresString } from "../validators/isPostgresString.validator";

export class PostgresConnection {
    @IsString()
    @Validate(IsPostgresString)
    readonly url: string;
}
