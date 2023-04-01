import { IsNotEmpty, IsString } from "class-validator";
import { Trim } from "../../../common/decorators/trim.decorator";

export class CreateReportDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @Trim()
    @IsNotEmpty()
    readonly description: string;
}
