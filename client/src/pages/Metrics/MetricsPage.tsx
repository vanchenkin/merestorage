import { Badge, Button, Table } from "antd";
import React from "react";
import { Resource } from "@prisma/client";
import { Wrapper } from "../../components/Wrapper/Wrapper";
import { Link } from "react-router-dom";
import { ConfirmModal } from "../../components/ConfirmModal/ConfirmModal";
import { useAppSelector } from "../../store/store";
import {
    useGetAllMetricsQuery,
    useRemoveMetricMutation,
} from "../../store/metrics/metricsApi";

const { Column } = Table;

export const MetricsPage: React.FC = () => {
    const project = useAppSelector((state) => state.context.project);

    const { data: metrics, isLoading: isLoadingData } = useGetAllMetricsQuery(
        project!
    );
    const [removeMetric] = useRemoveMetricMutation();
    console.log(metrics);

    return (
        <Wrapper>
            <Table
                dataSource={metrics}
                pagination={false}
                loading={isLoadingData}
                rowKey={(resource) => resource.id}
            >
                <Column
                    title="Имя"
                    dataIndex="name"
                    key="name"
                    filterSearch
                    render={(name: string) => (
                        <Badge status="default" text={name} />
                    )}
                />
                <Column dataIndex="description" key="description" />
                <Column
                    title="Имя ресурса"
                    key="resource.name"
                    width={150}
                    render={(metric) => metric.resource.name}
                />
                <Column
                    title="Тип метрики"
                    dataIndex="type"
                    key="type"
                    width={150}
                />

                <Column
                    title={() => (
                        <Link to="/metrics/create">
                            <Button type="link">Создать</Button>
                        </Link>
                    )}
                    align="right"
                    width={150}
                    key="action"
                    render={(_: unknown, resource: Resource) => (
                        <>
                            <Link to="/metrics/create">
                                <Button type="link">Посмотреть данные</Button>
                            </Link>
                            <Link to="/metrics/create">
                                <Button type="link">Изменить</Button>
                            </Link>
                            <ConfirmModal
                                message={`Вы уверены что хотите удалить метрику ${resource.name}?`}
                                description="Восстановить его не получится"
                                onConfirm={() => removeMetric(resource.id)}
                            >
                                <Button type="link">Удалить</Button>
                            </ConfirmModal>
                        </>
                    )}
                />
            </Table>
        </Wrapper>
    );
};

export default MetricsPage;
