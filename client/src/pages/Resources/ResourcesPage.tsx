import { Badge, Button, Table } from "antd";
import React from "react";
import { Resource } from "@prisma/client";
import { Wrapper } from "../../components/Wrapper/Wrapper";
import { Link } from "react-router-dom";
import { ConfirmModal } from "../../components/ConfirmModal/ConfirmModal";
import {
    useGetAllResourcesQuery,
    useRemoveResourceMutation,
} from "../../store/resources/resourcesApi";
import { useAppSelector } from "../../store/store";

export const ResourcesPage: React.FC = () => {
    const project = useAppSelector((state) => state.context.project);

    const { data: resources, isLoading: isLoadingData } =
        useGetAllResourcesQuery(project);

    const [removeResource] = useRemoveResourceMutation();

    return (
        <Wrapper>
            <Table
                dataSource={resources}
                pagination={false}
                loading={isLoadingData}
                rowKey={(resource) => resource.id}
            >
                <Table.Column
                    title="Имя"
                    dataIndex="name"
                    key="name"
                    filterSearch
                    render={(name: string) => (
                        <Badge status="default" text={name} />
                    )}
                    ellipsis={true}
                />

                <Table.Column
                    dataIndex="description"
                    key="description"
                    ellipsis={true}
                />

                <Table.Column
                    title="Тип ресурса"
                    dataIndex="type"
                    key="type"
                    width={120}
                />

                <Table.Column
                    title={() => (
                        <Link to="/resources/create">
                            <Button type="link">Создать</Button>
                        </Link>
                    )}
                    align="right"
                    width={120}
                    key="action"
                    render={(_: unknown, resource: Resource) => (
                        <ConfirmModal
                            message={`Вы уверены что хотите удалить ресурс ${resource.name}?`}
                            description="Восстановить его не получится"
                            onConfirm={() => removeResource(resource.id)}
                        >
                            <Button type="link">Удалить</Button>
                        </ConfirmModal>
                    )}
                />
            </Table>
        </Wrapper>
    );
};

export default ResourcesPage;
