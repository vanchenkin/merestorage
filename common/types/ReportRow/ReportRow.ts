import { ReportRowType } from "./ReportRowType";

export type ReportRow = {
    name: string;
    description: string;
    type: ReportRowType;
    query: Record<string, any>;
};
