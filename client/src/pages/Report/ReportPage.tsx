import React from "react";
import { NumberArr } from "../../../../common/types/reports/responses/ChartResponse";
import { Chart } from "../../components/ReportVisual/Chart/Chart";
import { Number } from "../../components/ReportVisual/Number/Number";
import { Wrapper } from "../../components/Wrapper/Wrapper";

export const ReportPage: React.FC = () => {
    const values: NumberArr = [
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
        </Wrapper>
    );
};

export default ReportPage;
