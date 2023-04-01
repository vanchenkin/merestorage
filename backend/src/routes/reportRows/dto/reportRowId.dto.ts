import { IsNumber } from "class-validator";

export class ReportRowIdDto {
    @IsNumber()
    readonly id: number;
}
