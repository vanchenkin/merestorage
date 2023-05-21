import { Form } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";

export const SimpleQueryForm: React.FC = () => {
    return (
        <>
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
        </>
    );
};
