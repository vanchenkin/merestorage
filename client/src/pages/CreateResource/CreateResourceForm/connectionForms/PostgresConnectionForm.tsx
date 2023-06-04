import { Form, Input } from "antd";
import React from "react";

export const PostgresConnectionForm: React.FC = () => {
    return (
        <>
            <Form.Item
                label="Строка подключения"
                labelAlign="left"
                name={["credentials", "url"]}
                rules={[
                    {
                        required: true,
                        message: "Введите строку подключения",
                    },
                ]}
            >
                <Input />
            </Form.Item>
        </>
    );
};
