import React, { useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { useParams } from "react-router-dom";
import { ReportRow } from "../../../../common/types/ReportRow";
import { ReportRowType } from "../../../../common/types/ReportRowType";
import { Wrapper } from "../../components/Wrapper/Wrapper";
import { useGetReportQuery } from "../../store/reports/reportsApi";
import { ChartHydrated } from "./ChartHydrated";
import { NumberHydrated } from "./NumberHydrated";
import { DatePicker, Typography } from "antd";

const { RangePicker } = DatePicker;

import styles from "./Report.module.scss";

export const ReportPage: React.FC = () => {
    const reportId = +useParams().reportId!;

    const [dateRange, setDateRange] = useState<undefined | string[]>();

    const { data } = useGetReportQuery(reportId);

    const rows = (data?.rows as ReportRow[]) ?? [];

    const handleDatePickerChange = (_date: any, dateStrings: string[]) => {
        setDateRange(dateStrings);
    };

    return (
        <Wrapper
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
            }}
        >
            <RangePicker
                showTime
                onChange={handleDatePickerChange}
                allowEmpty={[true, true]}
            />
            <Typography.Title level={1}>{data?.name}</Typography.Title>

            <Typography.Title level={3} style={{ marginTop: 0 }}>
                {data?.description}
            </Typography.Title>

            <div className={styles.reportWrapper}>
                {rows.map((reportRow) =>
                    reportRow.type === ReportRowType.Chart ? (
                        <ChartHydrated
                            key={nanoid()}
                            reportRow={reportRow}
                            projectId={data?.projectId || 0}
                            dateRange={dateRange}
                        />
                    ) : (
                        <NumberHydrated
                            key={nanoid()}
                            reportRow={reportRow}
                            projectId={data?.projectId || 0}
                            dateRange={dateRange}
                        />
                    )
                )}
            </div>
        </Wrapper>
    );
};

export default ReportPage;
