import {
    CheckCircleOutlined,
    ExclamationCircleOutlined,
    LoadingOutlined,
    QuestionCircleOutlined,
} from "@ant-design/icons";
import { ResourceType } from "@prisma/client";
import { Button, Spin } from "antd";
import React, { useState } from "react";
import { fetchBase } from "../../../common/utils/fetchBase";

import styles from "./CheckResourceCard.module.scss";

type Props = {
    data: {
        type: ResourceType;
        credentials: Record<string, any>;
    };
};

export const CheckResourceCard: React.FC<Props> = ({ data }) => {
    const [error, setError] = useState<string | null | undefined>(undefined);
    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        setLoading(true);
        fetchBase("/resource/check", {
            method: "POST",
            body: JSON.stringify(data),
        }).then((data) => {
            setLoading(false);
            if (data) {
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
