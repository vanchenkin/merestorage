import React, { useMemo, useState } from "react";
import { Button, Pagination, Result, Table } from "antd";
import { Wrapper } from "../../components/Wrapper/Wrapper";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../store/store";
import {
    useCollectMetricMutation,
    useGetAllMetricsQuery,
    useGetMetricDataQuery,
    useRemoveMetricDataMutation,
} from "../../store/metrics/metricsApi";
import { Loader } from "../../components/Loader/Loader";
import { PageHeader } from "../../components/PageHeader/PageHeader";
import { getLocalTimestamp } from "../../../../common/utils/getLocalTimestamp";
import { ConfirmModal } from "../../components/ConfirmModal/ConfirmModal";
import { MetricData } from "@prisma/client";

const PAGE_COUNT = 15;

export const MetricPage: React.FC = () => {
    const [page, setPage] = useState(1);

    const metricId = +useParams().metricId!;

    const project = useAppSelector((state) => state.context.project);

    const { data: metrics, isLoading: isLoadingMetrics } =
        useGetAllMetricsQuery(project);

    const { data: metricData, isLoading: isLoadingData } =
        useGetMetricDataQuery({
            id: metricId,
            page,
            pageCount: PAGE_COUNT,
        });

    const [removeMetric, { isLoading: isLoadingRemove }] =
        useRemoveMetricDataMutation();

    const [collectMetric, { isLoading: isLoadingCollect }] =
        useCollectMetricMutation();

    const metric = useMemo(
        () => metrics?.find((metric) => metric.id === Number(metricId)) || null,
        [metrics, metricId]
    );

    const handlePageChange = (page: number) => {
        setPage(page);
    };

    if (isLoadingMetrics || isLoadingData) {
        return <Loader />;
    }

    if (!metric) {
        return <Result status="error" title="Метрика не найдена" />;
    }

    return (
        <Wrapper>
            <PageHeader navigateTo="/metrics">
                Данные по метрике {metric.name}
            </PageHeader>

            <div>
                <Pagination
                    defaultCurrent={1}
                    total={metricData?.total}
                    pageSize={PAGE_COUNT}
                    onChange={handlePageChange}
                    current={page}
                    showSizeChanger={false}
                />
            </div>

            <Table
                dataSource={metricData?.data}
                pagination={false}
                rowKey={(resource) => resource.id}
                expandable={{
                    expandedRowRender: (metricData) => (
                        <div>
                            <pre>
                                {JSON.stringify(metricData.data, null, 2)}
                            </pre>
                        </div>
                    ),
                    rowExpandable: (metricData) =>
                        typeof metricData.data === "object",
                }}
            >
                <Table.Column
                    title="Значение"
                    dataIndex="data"
                    key="data"
                    ellipsis={true}
                    render={(value) => JSON.stringify(value)}
                />

                <Table.Column
                    title="Время"
                    dataIndex="createdAt"
                    key="createdAt"
                    width={230}
                    render={(value) => getLocalTimestamp(+new Date(value))}
                />

                <Table.Column
                    title={() => (
                        <Button
                            type="link"
                            onClick={() => collectMetric(metricId)}
                            loading={isLoadingCollect}
                        >
                            Собрать
                        </Button>
                    )}
                    align="right"
                    width={110}
                    key="action"
                    render={(_: unknown, metricData: MetricData) => (
                        <ConfirmModal
                            message={`Вы уверены что хотите удалить данные?`}
                            description="Восстановить их не получится"
                            onConfirm={() => removeMetric(metricData.id)}
                        >
                            <Button type="link" loading={isLoadingRemove}>
                                Удалить
                            </Button>
                        </ConfirmModal>
                    )}
                />
            </Table>
        </Wrapper>
    );
};

export default MetricPage;
