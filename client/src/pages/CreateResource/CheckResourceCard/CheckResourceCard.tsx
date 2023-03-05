import {
    CheckCircleOutlined,
    ExclamationCircleOutlined,
    LoadingOutlined,
    QuestionCircleOutlined,
} from "@ant-design/icons";
import { Button, Spin } from "antd";
import React, { useState } from "react";
import { fetchBase } from "../../../common/utils/fetchBase";

import styles from "./CheckResourceCard.module.scss";

export const CheckResourceCard: React.FC = () => {
    const [error, setError] = useState<string | null | undefined>(undefined);
    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        setLoading(true);
        fetchBase("/resources/check").then((data) => {
            setLoading(false);
            if (data.statusCode !== 200) {
                setError(data.message);
            } else {
                setError(null);
            }
        });
    };

    return (
        <div className={styles.checkCard} onClick={handleClick}>
            <div className={styles.title}>Проверка подключения к ресурсу</div>
            <div className={styles.icon}>
                {loading && (
                    <Spin
                        indicator={<LoadingOutlined className={styles.icon} />}
                    />
                )}

                {!loading && error === null && (
                    <CheckCircleOutlined size={32} />
                )}
                {!loading && error && <ExclamationCircleOutlined size={128} />}
                {!loading && error === undefined && (
                    <QuestionCircleOutlined size={32} />
                )}
            </div>

            <div className={styles.error}>{error}</div>
            <Button>Проверить</Button>
        </div>
    );
};
