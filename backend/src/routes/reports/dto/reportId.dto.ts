import { IsNumber } from "class-validator";

export class ReportIdDto {
    @IsNumber()
    readonly id: number;
}
