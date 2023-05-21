import { IsNotEmpty, IsString } from "class-validator";
import { Trim } from "../../../../decorators/trim.decorator";

export class SageConnection {
    @IsString()
    @Trim()
    @IsNotEmpty()
    readonly bearer: string;
}
