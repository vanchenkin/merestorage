import { ReportRowType } from "../ReportRowType";
import { ResponseType } from "./grammarMapper";

export type QueryResponse = {
    type: ReportRowType;
    hit: ResponseType;
};
