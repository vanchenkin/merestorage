import { IsNotEmpty, IsString, Validate } from "class-validator";
import { IsPostgresString } from "../../../../../routes/resources/validators/isPostgresString.validator";

export class PostgresConnection {
    @IsString()
    @IsNotEmpty()
    @Validate(IsPostgresString)
    readonly url: string;
}
