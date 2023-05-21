import { Badge, Button, Table } from "antd";
import React from "react";
import { Report } from "@prisma/client";
import { Wrapper } from "../../components/Wrapper/Wrapper";
import { Link } from "react-router-dom";
import { ConfirmModal } from "../../components/ConfirmModal/ConfirmModal";
import { useAppSelector } from "../../store/store";
import {
    useGetAllReportsQuery,
    useRemoveReportMutation,
} from "../../store/reports/reportsApi";

const { Column } = Table;

export const ReportsPage: React.FC = () => {
    const project = useAppSelector((state) => state.context.project);

    const { data: report, isLoading: isLoadingData } =
        useGetAllReportsQuery(project);
    const [removeReport] = useRemoveReportMutation();

    return (
        <Wrapper>
            <Table
                dataSource={report}
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
                    title={() => (
                        <Link to="/reports/create">
                            <Button type="link">Создать</Button>
                        </Link>
                    )}
                    align="right"
                    width={150}
                    key="action"
                    render={(_: unknown, report: Report) => (
                        <>
                            <Link to={`/reports/${report.id}/view`}>
                                <Button type="link">Смотреть</Button>
                            </Link>
                            <Link to={`/reports/${report.id}`}>
                                <Button type="link">Изменить</Button>
                            </Link>
                            <ConfirmModal
                                message={`Вы уверены что хотите удалить отчет ${report.name}?`}
                                description="Восстановить его не получится"
                                onConfirm={() => removeReport(report.id)}
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

export default ReportsPage;
