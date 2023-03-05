import { IsNotEmpty, IsString } from "class-validator";
import { Trim } from "../../../common/decorators/trim.decorator";

export class CreateProjectDto {
    @IsString()
    @Trim()
    @IsNotEmpty()
    readonly name: string;
}
