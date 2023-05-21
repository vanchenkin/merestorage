import React, { useEffect } from "react";
import { ReportRow } from "../../../../common/types/ReportRow";
import { QueryType } from "../../../../common/types/reports/grammarMapper";
import { NumberResponse } from "../../../../common/types/reports/responses/NumberResponse";
import { Number } from "../../components/ReportVisual/Number/Number";
import { useGetPreviewDataMutation } from "../../store/reports/reportsApi";

type Props = {
    reportRow: ReportRow;
    projectId: number;
};

export const NumberHydrated: React.FC<Props> = ({ reportRow, projectId }) => {
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

    return (
        <>
            {data && (
                <Number
                    value={data?.hit as NumberResponse}
                    name={reportRow.name}
                    description={reportRow.description}
                />
            )}
        </>
    );
};
