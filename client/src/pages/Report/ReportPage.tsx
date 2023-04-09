import React from "react";
import { ChartValue } from "../../../../common/types/ChartValue";
import { Chart } from "../../components/ReportVisual/Chart/Chart";
import { Number } from "../../components/ReportVisual/Number/Number";

export const ReportPage: React.FC = () => {
    const values: ChartValue[] = [
        {
            date: "2010-01",
            value: 1998,
        },
        {
            date: "2010-02",
            value: 1850,
        },
        {
            date: "2010-03",
            value: 1720,
        },
        {
            date: "2010-04",
            value: 1818,
        },
        {
            date: "2010-05",
            value: 1920,
        },
        {
            date: "2010-06",
            value: 1802,
        },
        {
            date: "2010-07",
            value: 1945,
        },
    ];

    return (
        <div
            style={{
                display: "flex",
                width: "100%",
                gap: 30,
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "wrap",
                padding: 50,
                // backgroundColor: "rgba(0, 0, 0, 0.1)",
            }}
        >
            <Number
                value={1}
                name="Количество записей"
                description="Полное количество записей за месяц"
            />
            <Number
                value={1}
                name="Количество записей"
                description="Полное количество записей за месяц"
            />
            <Number
                value={1}
                name="Количество записей"
                description="Полное количество записей за месяц"
            />
            <Number
                value={1}
                name="Количество записей"
                description="Полное количество записей за месяц"
            />
            <Number
                value={1}
                name="Количество записей"
                description="Полное количество записей за месяц"
            />

            <Chart
                values={values}
                name="Количество записей"
                description="Полное количество записей за месяц"
            />
        </div>
    );
};

export default ReportPage;
