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

const { Column } = Table;

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
                    title="Тип ресурса"
                    dataIndex="type"
                    key="type"
                    width={150}
                />

                <Column
                    title={() => (
                        <Link to="/resources/create">
                            <Button type="link">Создать</Button>
                        </Link>
                    )}
                    align="right"
                    width={150}
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
