import { Button, Form, FormInstance, Input, Select, Tooltip } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { MetricType } from "../../../../../common/types/MetricType";
import { useUpsertMetricMutation } from "../../../store/metrics/metricsApi";
import { useGetAllResourcesQuery } from "../../../store/resources/resourcesApi";
import { useAppSelector } from "../../../store/store";
import { MetricComponentMapper } from "./types/MetricComponentMapper";
import cronstrue from "cronstrue/i18n";

type Props = {
    form: FormInstance;
};

export const MetricForm: React.FC<Props> = ({ form }) => {
    const resourceId = Form.useWatch("resourceId", form);
    const cron = Form.useWatch("cron", form);

    let cronParsed = "";
    try {
        cronParsed = cronstrue.toString(cron, {
            locale: "ru",
        });
    } catch {}

    const project = useAppSelector((state) => state.context.project);
    const [upsertMetric, { isLoading }] = useUpsertMetricMutation();
    const { data: resources, isLoading: isLoadingResources } =
        useGetAllResourcesQuery(project);

    const navigate = useNavigate();

    const onFinish = async (values: any) => {
        const result = await upsertMetric({
            projectId: project,
            metric: values,
        });

        if (!("error" in result)) {
            navigate(-1);
        }
    };

    const resource = resources?.find(
        (resource) => resource.id === resourceId
    )?.type;

    return (
        <Form
            name="metric"
            labelCol={{ span: 8 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
            form={form}
        >
            <Form.Item name="id" hidden>
                <Input hidden />
            </Form.Item>
            <Form.Item
                label="Имя"
                labelAlign="left"
                name="name"
                rules={[
                    {
                        required: true,
                        message: "Введите имя метрики",
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
                        message: "Введите описание метрики",
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Tooltip title={cronParsed || "Не удалось распарсить"}>
                <Form.Item
                    label="Периодичность сбора"
                    name="cron"
                    labelAlign="left"
                >
                    <Input />
                </Form.Item>
            </Tooltip>

            <Form.Item
                label="Тип метрики"
                name="type"
                labelAlign="left"
                rules={[{ required: true, message: "Выберите тип метрики" }]}
            >
                <Select>
                    {Object.values(MetricType).map((metricType) => (
                        <Select.Option key={metricType} value={metricType}>
                            {metricType}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item
                label="Ресурс"
                name="resourceId"
                labelAlign="left"
                rules={[{ required: true, message: "Выберите ресурс" }]}
            >
                <Select allowClear loading={isLoadingResources}>
                    {resources?.map((resource) => (
                        <Select.Option key={resource.id} value={resource.id}>
                            {resource.name}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>

            {resource && MetricComponentMapper[resource]}

            <Form.Item>
                <Button type="primary" htmlType="submit" loading={isLoading}>
                    Сохранить
                </Button>
            </Form.Item>
        </Form>
    );
};
