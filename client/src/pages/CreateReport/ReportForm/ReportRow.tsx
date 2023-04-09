import { Button, Form, FormInstance, Input, Select } from "antd";
import React from "react";
import { ReportRowType } from "../../../../../common/types/ReportRow/ReportRowType";
import { Chart } from "../../../components/ReportVisual/Chart/Chart";
import { Number } from "../../../components/ReportVisual/Number/Number";
import { useGetPreviewDataMutation } from "../../../store/reports/reportsApi";
import { useAppSelector } from "../../../store/store";

type Props = {
    form: FormInstance;
    field: Record<string, any>;
};

export const ReportRow: React.FC<Props> = ({
    form,
    field: { name, ...restField },
}) => {
    const rowType = Form.useWatch(["rows", name, "type"], form);
    const rowName = Form.useWatch(["rows", name, "name"], form);
    const rowDescription = Form.useWatch(["rows", name, "description"], form);

    const project = useAppSelector((state) => state.context.project);

    const [getPreview, { data, isLoading }] = useGetPreviewDataMutation();

    const handlePreview = (name: number) => {
        const query = form.getFieldValue(["rows", name, "query"]);
        getPreview({
            query: {
                type: rowType,
                ...query,
            },
            projectId: project,
        });
    };

    return (
        <>
            <Form.Item
                {...restField}
                label="Имя ряда"
                labelAlign="left"
                name={[name, "name"]}
                rules={[
                    {
                        required: true,
                        message: "Введите имя ряда",
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                {...restField}
                label="Описание ряда"
                name={[name, "description"]}
                labelAlign="left"
                rules={[
                    {
                        required: true,
                        message: "Введите описание ряда",
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                {...restField}
                label="Тип ряда"
                name={[name, "type"]}
                labelAlign="left"
                rules={[
                    {
                        required: true,
                        message: "Выберите тип ряда",
                    },
                ]}
            >
                <Select>
                    {Object.values(ReportRowType).map((reportRowType) => (
                        <Select.Option
                            key={reportRowType}
                            value={reportRowType}
                        >
                            {reportRowType}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item
                {...restField}
                label="Запрос"
                name={[name, "query", "string"]}
                labelAlign="left"
                rules={[
                    {
                        required: true,
                        message: "Введите запрос",
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Button
                style={{ marginTop: 15, marginBottom: 15 }}
                onClick={() => handlePreview(name)}
                loading={isLoading}
            >
                Предпросмотр
            </Button>

            {data &&
                rowType === ReportRowType.Chart &&
                data.type === rowType && (
                    <Chart
                        name={rowName}
                        description={rowDescription}
                        values={data.hit}
                    />
                )}

            {data &&
                rowType === ReportRowType.Number &&
                data.type === rowType && (
                    <Number
                        name={rowName}
                        description={rowDescription}
                        value={data.hit}
                    />
                )}
        </>
    );
};
