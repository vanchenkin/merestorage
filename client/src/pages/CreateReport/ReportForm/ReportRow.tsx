import React from "react";
import { Button, Form, FormInstance, Input, Select } from "antd";
import { ReportRowType } from "../../../../../common/types/ReportRowType";
import { Chart } from "../../../components/ReportVisual/Chart/Chart";
import { Number } from "../../../components/ReportVisual/Number/Number";
import { useGetPreviewDataMutation } from "../../../store/reports/reportsApi";
import { useAppSelector } from "../../../store/store";
import { ChartResponse } from "../../../../../common/types/reports/responses/ChartResponse";
import { NumberResponse } from "../../../../../common/types/reports/responses/NumberResponse";
import { QueryType } from "../../../../../common/types/reports/grammarMapper";

type Props = {
    form: FormInstance;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    field: Record<string, any>;
};

export const ReportRow: React.FC<Props> = ({
    form,
    field: { name, ...restField },
}) => {
    const project = useAppSelector((state) => state.context.project);

    const rowType: ReportRowType = Form.useWatch(["rows", name, "type"], form);
    const rowName: string = Form.useWatch(["rows", name, "name"], form);
    const rowDescription: string = Form.useWatch(
        ["rows", name, "description"],
        form
    );

    const [getPreview, { data, isLoading }] = useGetPreviewDataMutation();

    const handlePreview = (name: number) => {
        const query = form.getFieldValue(["rows", name, "query"]) as QueryType;

        getPreview({
            query: {
                type: rowType,
                query: query,
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
                        values={data.hit as ChartResponse}
                    />
                )}

            {data &&
                rowType === ReportRowType.Number &&
                data.type === rowType && (
                    <Number
                        name={rowName}
                        description={rowDescription}
                        value={data.hit as NumberResponse}
                    />
                )}
        </>
    );
};
