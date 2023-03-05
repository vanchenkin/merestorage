import React from "react";
import { PageHeader } from "../../components/PageHeader/PageHeader";
import { Wrapper } from "../../components/Wrapper/Wrapper";
import { CheckResourceCard } from "./CheckResourceCard/CheckResourceCard";
import { CreateResourceForm } from "./CreateResourceForm/CreateResourceForm";

import styles from "./CreateResourcePage.module.scss";

const CreateResourcePage: React.FC = () => {
    return (
        <Wrapper>
            <PageHeader navigateTo="/resources">Создание ресурса</PageHeader>
            <div className={styles.wrapper}>
                <div className={styles.form}>
                    <CreateResourceForm />
                </div>
                <div className={styles.checkCard}>
                    <CheckResourceCard />
                </div>
            </div>
        </Wrapper>
    );
};

export default CreateResourcePage;
