import { Resource } from "@prisma/client";
import { Form } from "antd";
import React, { useState } from "react";
import { CheckCard } from "../../components/CheckCard/CheckCard";
import { PageHeader } from "../../components/PageHeader/PageHeader";
import { Wrapper } from "../../components/Wrapper/Wrapper";
import { CreateResourceForm } from "./CreateResourceForm/CreateResourceForm";

import styles from "./CreateResourcePage.module.scss";

const CreateResourcePage: React.FC = () => {
    const [form] = Form.useForm<Resource>();

    const credentials = Form.useWatch("credentials", form);
    const type = Form.useWatch("type", form);

    const [successCheck, setSuccessCheck] = useState(false);

    return (
        <Wrapper>
            <PageHeader navigateTo="/resources">Создание ресурса</PageHeader>
            <div className={styles.wrapper}>
                <div className={styles.form}>
                    <CreateResourceForm
                        form={form}
                        successCheck={successCheck}
                        setSuccessCheck={setSuccessCheck}
                    />
                </div>

                <div className={styles.checkCard}>
                    <CheckCard
                        title="Проверка подключения к ресурсу"
                        body={{ credentials, type }}
                        apiPath="/resources/check_credentials"
                        onResult={setSuccessCheck}
                    />
                </div>
            </div>
        </Wrapper>
    );
};

export default CreateResourcePage;
