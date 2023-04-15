import { IsNotEmpty, IsString } from "class-validator";
import { Trim } from "../../../../decorators/trim.decorator";

export class CassandraConnection {
    @IsString()
    @Trim()
    @IsNotEmpty()
    readonly url: string;
}
