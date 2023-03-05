import { IsNotEmpty, IsString } from "class-validator";

export class CassandraConnection {
    @IsString()
    @IsNotEmpty()
    readonly url: string;
}
