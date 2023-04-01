import {
    CheckCircleOutlined,
    ExclamationCircleOutlined,
    LoadingOutlined,
    QuestionCircleOutlined,
} from "@ant-design/icons";
import { Button, Spin } from "antd";
import React, { useState } from "react";
import { fetchBase } from "../../common/utils/fetchBase";

import styles from "./CheckCard.module.scss";

type Props = {
    title: string;
    apiPath: string;
    body: Record<string, any>;
    onResult?: (value: boolean) => void;
};

type ResponseType = {
    statusCode: number;
    message: string;
};

/**
 * Ручка apiPath должна возвращать ошибку в data.message или пустой ответ
 */
export const CheckCard: React.FC<Props> = ({
    body,
    title,
    apiPath,
    onResult,
}) => {
    const [error, setError] = useState<string | undefined>(undefined);
    const [data, setData] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        setLoading(true);
        fetchBase(apiPath, {
            method: "POST",
            body: JSON.stringify(body),
        }).then((data: ResponseType) => {
            setLoading(false);
            setData(undefined);
            setError(undefined);
            if (data.statusCode === 200) {
                setError(data.message);
                if (onResult) onResult(false);
            } else {
                setData(data.message);
                if (onResult) onResult(true);
            }
        });
    };

    const content = loading ? (
        <Spin indicator={<LoadingOutlined className={styles.icon} />} />
    ) : (
        <>
            {data && <CheckCircleOutlined className={styles.icon} />}
            {error && <ExclamationCircleOutlined className={styles.icon} />}
            {error === undefined && data === undefined && (
                <QuestionCircleOutlined className={styles.icon} />
            )}
        </>
    );

    return (
        <div className={styles.checkCard}>
            <div className={styles.title}>{title}</div>
            <div className={styles.icon}></div>
            {content}
            <div className={styles.content}>{error ?? data ?? ""}</div>
            <Button onClick={handleClick}>Проверить</Button>
        </div>
    );
};
