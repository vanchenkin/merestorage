import { Form } from "antd";
import React from "react";
import { PageHeader } from "../../components/PageHeader/PageHeader";
import { Wrapper } from "../../components/Wrapper/Wrapper";
import { CheckResourceCard } from "./CheckResourceCard/CheckResourceCard";
import { CreateResourceForm } from "./CreateResourceForm/CreateResourceForm";

import styles from "./CreateMetricPage.module.scss";

const CreateMetricPage: React.FC = () => {
    const [form] = Form.useForm();
    const credentials = Form.useWatch("credentials", form);
    const type = Form.useWatch("type", form);

    return (
        <Wrapper>
            <PageHeader navigateTo="/metrics">Создание метрики</PageHeader>
            <div className={styles.wrapper}>
                <div className={styles.form}>
                    <CreateResourceForm form={form} />
                </div>
                <div className={styles.checkCard}>
                    <CheckResourceCard data={{ credentials, type }} />
                </div>
            </div>
        </Wrapper>
    );
};

export default CreateMetricPage;
