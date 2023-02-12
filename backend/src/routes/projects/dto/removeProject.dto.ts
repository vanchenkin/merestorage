import { IsNumber } from "class-validator";

export class RemoveProjectDto {
    @IsNumber()
    readonly id: number;
}
