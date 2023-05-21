import React, { useMemo } from "react";
import { Button, Form, FormInstance, Input, Select } from "antd";
import { ReportRowType } from "../../../../../common/types/ReportRowType";
import { Chart } from "../../../components/ReportVisual/Chart/Chart";
import { Number } from "../../../components/ReportVisual/Number/Number";
import { useGetPreviewDataMutation } from "../../../store/reports/reportsApi";
import { useAppSelector } from "../../../store/store";
import {
    ChartResponse,
    ChartValueType,
} from "../../../../../common/types/reports/responses/ChartResponse";
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

    const [getPreview, { data, isLoading }] = useGetPreviewDataMutation();

    const transformedData = useMemo(() => {
        if (!data) return;

        if (data.type === ReportRowType.Number) {
            return data;
        }

        if (data.type === ReportRowType.Chart) {
            const resultValues: ChartValueType = [];

            (data.hit as ChartResponse).forEach((chartValue) => {
                if (typeof chartValue.value === "object") {
                    Object.entries(chartValue.value).forEach((entry) => {
                        resultValues.push({
                            ...chartValue,
                            value: entry[1],
                            type: entry[0],
                        });
                    });
                } else if (typeof chartValue.value === "number") {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    resultValues.push(chartValue);
                }
            });

            return {
                ...data,
                hit: resultValues,
            };
        }

        return undefined;
    }, [data]);

    const handlePreview = (name: number) => {
        const query = form.getFieldValue(["rows", name, "query"]) as QueryType;
        const rowType: ReportRowType = form.getFieldValue([
            "rows",
            name,
            "type",
        ]);

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

            {transformedData && (
                <Form.Item shouldUpdate>
                    {() => {
                        const rowType: ReportRowType = form.getFieldValue([
                            "rows",
                            name,
                            "type",
                        ]);
                        const rowName: string = form.getFieldValue([
                            "rows",
                            name,
                            "name",
                        ]);
                        const rowDescription: string = form.getFieldValue([
                            "rows",
                            name,
                            "description",
                        ]);
                        return (
                            <>
                                {rowType === ReportRowType.Chart &&
                                    transformedData.type === rowType && (
                                        <Chart
                                            name={rowName}
                                            description={rowDescription}
                                            values={
                                                transformedData.hit as ChartValueType
                                            }
                                        />
                                    )}

                                {rowType === ReportRowType.Number &&
                                    transformedData.type === rowType && (
                                        <Number
                                            name={rowName}
                                            description={rowDescription}
                                            value={
                                                transformedData.hit as NumberResponse
                                            }
                                        />
                                    )}
                            </>
                        );
                    }}
                </Form.Item>
            )}
        </>
    );
};
