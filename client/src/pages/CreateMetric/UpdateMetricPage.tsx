import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useGetAllMetricsQuery } from "../../store/metrics/metricsApi";
import { useAppSelector } from "../../store/store";

import { CreateMetricPage } from "./CreateMetricPage";

const UpdateMetricPage: React.FC = () => {
    const { metricId } = useParams();
    const project = useAppSelector((state) => state.context.project);

    const { data: metrics } = useGetAllMetricsQuery(project);

    const memoMetric = useMemo(
        () => metrics?.find((metric) => metric.id === Number(metricId)) || {},
        [metrics, metricId]
    );

    return <CreateMetricPage initialValues={memoMetric} />;
};

export default UpdateMetricPage;
