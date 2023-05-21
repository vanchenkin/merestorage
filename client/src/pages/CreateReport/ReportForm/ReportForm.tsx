import React from "react";
import { Button, Collapse, Form, FormInstance, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useUpsertReportMutation } from "../../../store/reports/reportsApi";
import { useAppSelector } from "../../../store/store";
import { Typography } from "antd";
import { ReportRowManager } from "./ReportRowManager";
import { Report } from "@prisma/client";

type Props = {
    form: FormInstance;
};

export const ReportForm: React.FC<Props> = ({ form }) => {
    const navigate = useNavigate();

    const project = useAppSelector((state) => state.context.project);

    const [upsertReport, { isLoading }] = useUpsertReportMutation();

    const handleSubmit = async (values: Report) => {
        const result = await upsertReport({
            projectId: project,
            report: values,
        });

        if (!("error" in result)) {
            navigate(-1);
        }
    };

    return (
        <Form
            name="report"
            labelCol={{ span: 8 }}
            initialValues={{ remember: true }}
            onFinish={handleSubmit}
            autoComplete="off"
            form={form}
        >
            <Collapse style={{ marginBottom: 15 }}>
                <Collapse.Panel header="Документация к запросам" key="1">
                    <p>
                        В запросах нужно использовать имя метрики в формате:
                        $имя метрики
                    </p>
                    <p>
                        Если тип графика Number, то итоговым результатом
                        вычисления запроса должен быть number
                    </p>
                    <p>
                        Если тип графика Chart, то итоговым результатом
                        вычисления запроса должен быть number[] или object[]
                    </p>
                    <p>
                        Доступны все базовые математические операции с числами,
                        например: (2+5/2)*6
                    </p>
                    <p>
                        Доступны все базовые математические операции с
                        массивами, которые применяются для каждого элемента
                        массива, например: ($metricName + 5) / 2
                    </p>
                    <pre>{`Общий список доступных операций:

                        number + number -> number
                            +
                            -
                            *
                            /

                        number + number[] -> number[]:
                            +
                            -
                            *
                            /

                        number + object[] -> object[]
                            +
                            -
                            *
                            /

                        aggr number[] -> number:
                            sum
                            avg
                            min
                            max
                            median

                        aggr object[] -> object:
                            sumObject
                            minObject
                            maxObject

                        reduce object[] -> number[]
                            sum
                            avg
                            min
                            max
                            median

                        reduce object -> number
                            sum
                            avg
                            min
                            max
                            median
                    `}</pre>
                </Collapse.Panel>
            </Collapse>

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
                        message: "Введите имя отчета",
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item label="Описание" name="description" labelAlign="left">
                <Input />
            </Form.Item>

            <Typography.Title level={5}>Ряды отчета</Typography.Title>

            <ReportRowManager form={form} />

            <Form.Item>
                <Button type="primary" htmlType="submit" loading={isLoading}>
                    Сохранить
                </Button>
            </Form.Item>
        </Form>
    );
};
