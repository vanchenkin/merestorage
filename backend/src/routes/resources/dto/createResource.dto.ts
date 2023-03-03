import { IsString } from "class-validator";
import { Transform, TransformFnParams } from "class-transformer";

export class CreateResourceDto {
    @IsString()
    @Transform(({ value }: TransformFnParams) => value?.trim())
    readonly name: string;
}
