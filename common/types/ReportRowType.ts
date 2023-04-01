import type { ReportRowType as ReportRowTypeOrigin } from "@prisma/client";

export const ReportTowType: { [k in ReportRowTypeOrigin]: k } = {
    Number: "Number",
    Chart: "Chart",
} as const;

export type ReportTowType = ReportRowTypeOrigin;
