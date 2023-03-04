import { IsString } from "class-validator";
import { Trim } from "../../../common/decorators/trim.decorator";

export class CreateProjectDto {
    @IsString()
    @Trim()
    readonly name: string;
}
