import { Button, Form, FormInstance, Input } from "antd";
import React from "react";
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

            <Form.Item
                label="Описание"
                name="description"
                labelAlign="left"
                rules={[
                    {
                        required: true,
                        message: "Введите описание отчета",
                    },
                ]}
            >
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
