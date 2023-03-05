import { Form, Input } from "antd";
import React from "react";

export const SageConnectionForm: React.FC = () => {
    return (
        <>
            <Form.Item
                label="Bearer токен"
                labelAlign="left"
                name={["credentials", "bearer"]}
                rules={[
                    {
                        required: true,
                        message: "Введите Bearer токен",
                    },
                ]}
            >
                <Input />
            </Form.Item>
        </>
    );
};
