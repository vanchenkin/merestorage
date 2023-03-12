import { Form } from "antd";
import React, { useEffect } from "react";
import { CheckCard } from "../../components/CheckCard/CheckCard";
import { PageHeader } from "../../components/PageHeader/PageHeader";
import { Wrapper } from "../../components/Wrapper/Wrapper";
import { MetricForm } from "./MetricForm/MetricForm";

import styles from "./CreateMetricPage.module.scss";

type Props = {
    initialValues?: Record<string, any>;
};

export const CreateMetricPage: React.FC<Props> = ({ initialValues }) => {
    const [form] = Form.useForm();
    const query = Form.useWatch("query", form);
    const resourceId = Form.useWatch("resourceId", form);
    const type = Form.useWatch("type", form);

    useEffect(() => {
        Object.entries(initialValues || {}).forEach((entry) =>
            form.setFieldValue(entry[0], entry[1])
        );
    }, [initialValues]);

    return (
        <Wrapper>
            <PageHeader navigateTo="/metrics">
                {Object.keys(initialValues || {}).length !== 0
                    ? "Изменение метрики"
                    : "Создание метрики"}
            </PageHeader>
            <div className={styles.wrapper}>
                <div className={styles.form}>
                    <MetricForm form={form} />
                </div>
                <div className={styles.checkCard}>
                    <CheckCard
                        title="Проверка сбора данных"
                        body={{ query, type, resourceId }}
                        apiPath="/metric/check_query"
                    />
                </div>
            </div>
        </Wrapper>
    );
};

export default CreateMetricPage;
