import { ResourceType } from "@prisma/client";
import { Button, Form, FormInstance, Input, Select } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateResourceMutation } from "../../../store/resources/resourcesApi";
import { useAppSelector } from "../../../store/store";
import { ResourceTypeComponentMapper } from "./types/ResourceTypeComponentMapper";

type Props = {
    form: FormInstance;
};

export const CreateResourceForm: React.FC<Props> = ({ form }) => {
    const [type, setType] = useState<ResourceType>();

    const project = useAppSelector((state) => state.context.project);
    const [createResource, { isLoading }] = useCreateResourceMutation();

    const navigate = useNavigate();

    const onFinish = async (values: any) => {
        const result = await createResource({
            projectId: project!,
            resource: values,
        });

        if (!("error" in result)) {
            navigate(-1);
        }
    };

    const onTypeChange = (option: ResourceType) => {
        setType(option);
    };

    return (
        <Form
            name="resource"
            labelCol={{ span: 8 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
            form={form}
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

            <Form.Item
                label="Описание"
                name="description"
                labelAlign="left"
                rules={[
                    {
                        required: true,
                        message: "Введите описание ресурса",
                    },
                ]}
            >
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
                <Button type="primary" htmlType="submit" loading={isLoading}>
                    Создать
                </Button>
            </Form.Item>
        </Form>
    );
};
