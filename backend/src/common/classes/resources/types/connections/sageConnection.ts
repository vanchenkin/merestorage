import { IsNotEmpty, IsString } from "class-validator";

export class SageConnection {
    @IsString()
    @IsNotEmpty()
    readonly bearer: string;
}
