import { Resource } from "@prisma/client";
import { Button, Form, FormInstance, Input, Select, Tooltip } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ResourceType } from "../../../../../common/types/ResourceType";
import { useCreateResourceMutation } from "../../../store/resources/resourcesApi";
import { useAppSelector } from "../../../store/store";
import { ResourceTypeComponentMapper } from "./types/ResourceTypeComponentMapper";

type Props = {
    form: FormInstance<Resource>;
    setSuccessCheck: (value: boolean) => void;
    successCheck: boolean;
};

export const CreateResourceForm: React.FC<Props> = ({
    form,
    setSuccessCheck,
    successCheck,
}) => {
    const navigate = useNavigate();

    const project = useAppSelector((state) => state.context.project);

    const [createResource, { isLoading }] = useCreateResourceMutation();

    const [type, setType] = useState<ResourceType>();

    const onFinish = async (values: Resource) => {
        const result = await createResource({
            projectId: project,
            resource: values,
        });

        if (!("error" in result)) {
            navigate(-1);
        }
    };

    const onTypeChange = (option: ResourceType) => {
        setType(option);
    };

    const handleFormChange = () => {
        setSuccessCheck(false);
    };

    return (
        <Form
            name="resource"
            labelCol={{ span: 8 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
            form={form}
            onChange={handleFormChange}
        >
            <Form.Item
                label="Имя"
                labelAlign="left"
                name="name"
                rules={[
                    {
                        required: true,
                        message: "Введите имя ресурса",
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item label="Описание" name="description" labelAlign="left">
                <Input />
            </Form.Item>

            <Form.Item
                label="Тип ресурса"
                name="type"
                labelAlign="left"
                rules={[{ required: true, message: "Выберите тип ресурса" }]}
            >
                <Select onChange={onTypeChange} allowClear value={type}>
                    {Object.values(ResourceType).map((resource) => (
                        <Select.Option key={resource} value={resource}>
                            {resource}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>

            {type && ResourceTypeComponentMapper[type]}

            <Form.Item>
                <Tooltip title="Чтобы создать ресурс, проверка должна пройти успешно">
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={isLoading}
                        disabled={!successCheck}
                    >
                        Создать
                    </Button>
                </Tooltip>
            </Form.Item>
        </Form>
    );
};
