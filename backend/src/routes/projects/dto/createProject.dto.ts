import { IsString } from "class-validator";
import { Transform, TransformFnParams } from "class-transformer";

export class CreateProjectDto {
    @IsString()
    @Transform(({ value }: TransformFnParams) => value?.trim())
    readonly name: string;
}
