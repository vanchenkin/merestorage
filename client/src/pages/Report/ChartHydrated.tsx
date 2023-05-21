import React, { useEffect, useMemo } from "react";
import { ReportRow } from "../../../../common/types/ReportRow";
import { QueryType } from "../../../../common/types/reports/grammarMapper";
import {
    ChartResponse,
    ChartValueType,
} from "../../../../common/types/reports/responses/ChartResponse";
import { Chart } from "../../components/ReportVisual/Chart/Chart";
import { useGetPreviewDataMutation } from "../../store/reports/reportsApi";

type Props = {
    reportRow: ReportRow;
    projectId: number;
};

export const ChartHydrated: React.FC<Props> = ({ reportRow, projectId }) => {
    const [getData, { data }] = useGetPreviewDataMutation();

    useEffect(() => {
        getData({
            projectId,
            query: {
                type: reportRow.type,
                query: reportRow.query as QueryType,
            },
        });
    }, [reportRow]);

    const transformedData = useMemo(() => {
        if (!data) return;

        const resultValues: ChartValueType = [];

        (data.hit as ChartResponse).forEach((chartValue) => {
            if (typeof chartValue.value === "object") {
                Object.entries(chartValue.value).forEach((entry) => {
                    resultValues.push({
                        ...chartValue,
                        value: entry[1],
                        type: entry[0],
                    });
                });
            } else if (typeof chartValue.value === "number") {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                resultValues.push(chartValue);
            }
        });

        return {
            ...data,
            hit: resultValues,
        };
    }, [data]);

    return (
        <>
            {transformedData && (
                <Chart
                    values={transformedData?.hit}
                    name={reportRow.name}
                    description={reportRow.description}
                />
            )}
        </>
    );
};
