import { IsNumber } from "class-validator";

export class RemoveResourceDto {
    @IsNumber()
    readonly id: number;
}
