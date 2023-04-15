import { Result } from "antd";
import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { useGetAllMetricsQuery } from "../../store/metrics/metricsApi";
import { useAppSelector } from "../../store/store";
import { CreateMetricPage } from "./CreateMetricPage";

const UpdateMetricPage: React.FC = () => {
    const { metricId } = useParams();

    const project = useAppSelector((state) => state.context.project);

    const { data: metrics, isLoading } = useGetAllMetricsQuery(project);

    const memoMetric = useMemo(
        () => metrics?.find((metric) => metric.id === Number(metricId)) || null,
        [metrics, metricId]
    );

    if (isLoading) {
        return <Loader />;
    }

    if (!memoMetric) {
        return <Result status="error" title="Метрика не найдена" />;
    }

    return <CreateMetricPage initialValues={memoMetric} />;
};

export default UpdateMetricPage;
