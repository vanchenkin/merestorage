import { Form, Input, Tooltip } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";

export const SageQueryForm: React.FC = () => {
    return (
        <>
            <Tooltip title="Работает -3h, -5m и тд">
                <Form.Item
                    label="Начало"
                    labelAlign="left"
                    name={["query", "startTime"]}
                    rules={[
                        {
                            required: true,
                            message: "Введите время начала поиска",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
            </Tooltip>

            <Tooltip title="Работает now">
                <Form.Item
                    label="Конец"
                    labelAlign="left"
                    name={["query", "endTime"]}
                    rules={[
                        {
                            required: true,
                            message: "Введите время конца поиска",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
            </Tooltip>

            <Form.Item
                label="Запрос"
                labelAlign="left"
                name={["query", "string"]}
                rules={[
                    {
                        required: true,
                        message: "Введите запрос",
                    },
                ]}
            >
                <TextArea />
            </Form.Item>
            <Form.Item
                label="Количество логов"
                labelAlign="left"
                name={["query", "size"]}
                rules={[
                    {
                        required: true,
                        message: "Введите максимальное количество логов",
                    },
                ]}
            >
                <Input type="number" />
            </Form.Item>
        </>
    );
};
