import { Form } from "antd";
import React, { useEffect } from "react";
import { PageHeader } from "../../components/PageHeader/PageHeader";
import { Wrapper } from "../../components/Wrapper/Wrapper";

import styles from "./CreateReportPage.module.scss";
import { ReportForm } from "./ReportForm/ReportForm";

type Props = {
    initialValues?: Record<string, any>;
};

export const CreateReportPage: React.FC<Props> = ({ initialValues }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        Object.entries(initialValues || {}).forEach((entry) =>
            form.setFieldValue(entry[0], entry[1])
        );
    }, [initialValues]);

    return (
        <Wrapper>
            <PageHeader navigateTo="/reports">
                {Object.keys(initialValues || {}).length !== 0
                    ? "Изменение отчета"
                    : "Создание отчета"}
            </PageHeader>
            <div className={styles.wrapper}>
                <div className={styles.form}>
                    <ReportForm form={form} />
                </div>
            </div>
        </Wrapper>
    );
};

export default CreateReportPage;
