import { Button, Form, FormInstance } from "antd";
import React from "react";
import { ReportRow } from "./ReportRow";

type Props = {
    form: FormInstance;
};

export const ReportRowManager: React.FC<Props> = ({ form }) => {
    return (
        <Form.List name="rows">
            {(fields, { add, remove }) => (
                <>
                    {fields.map(({ key, ...field }) => (
                        <div key={key}>
                            <ReportRow form={form} field={field} />
                            <Button
                                style={{ marginTop: 15, marginBottom: 15 }}
                                onClick={() => remove(field.name)}
                            >
                                Удалить ряд
                            </Button>
                        </div>
                    ))}
                    <Form.Item>
                        <Button
                            style={{ marginTop: 15, marginBottom: 15 }}
                            onClick={() => add()}
                        >
                            Добавить ряд
                        </Button>
                    </Form.Item>
                </>
            )}
        </Form.List>
    );
};
