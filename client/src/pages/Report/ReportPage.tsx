import React from "react";
import { nanoid } from "@reduxjs/toolkit";
import { useParams } from "react-router-dom";
import { ReportRow } from "../../../../common/types/ReportRow";
import { ReportRowType } from "../../../../common/types/ReportRowType";
import { Wrapper } from "../../components/Wrapper/Wrapper";
import { useGetReportQuery } from "../../store/reports/reportsApi";
import { ChartHydrated } from "./ChartHydrated";
import { NumberHydrated } from "./NumberHydrated";

export const ReportPage: React.FC = () => {
    const reportId = +useParams().reportId!;

    const { data } = useGetReportQuery(reportId);

    const rows = (data?.rows as ReportRow[]) ?? [];

    return (
        <Wrapper
            style={{
                display: "flex",
                gap: 30,
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "wrap",
                paddingInline: "10%",
                paddingBottom: 70,
            }}
        >
            {rows.map((reportRow) =>
                reportRow.type === ReportRowType.Chart ? (
                    <ChartHydrated
                        key={nanoid()}
                        reportRow={reportRow}
                        projectId={data?.projectId || 0}
                    />
                ) : (
                    <NumberHydrated
                        key={nanoid()}
                        reportRow={reportRow}
                        projectId={data?.projectId || 0}
                    />
                )
            )}
        </Wrapper>
    );
};

export default ReportPage;
