import { ReportRowType } from "../ReportRowType";
import { ChartQuery } from "./queries/ChartQuery";
import { NumberQuery } from "./queries/NumberQuery";
import { ChartResponse } from "./responses/ChartResponse";
import { NumberResponse } from "./responses/NumberResponse";

export type ReportRowTypeQueryMapper = {
    [ReportRowType.Chart]: ChartQuery;
    [ReportRowType.Number]: NumberQuery;
};

export type ReportRowTypeResponseMapper = {
    [ReportRowType.Chart]: ChartResponse;
    [ReportRowType.Number]: NumberResponse;
};

export type QueryType = ReportRowTypeQueryMapper[ReportRowType];
export type ResponseType = ReportRowTypeResponseMapper[ReportRowType];
