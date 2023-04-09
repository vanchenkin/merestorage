import { Typography } from "antd";
import React from "react";

import styles from "./Number.module.scss";

type Props = {
    value: number;
    name?: string;
    description?: string;
};

export const Number: React.FC<Props> = ({ value, name, description }) => {
    return (
        <div className={styles.wrapper}>
            {name && (
                <Typography.Title level={3} className={styles.name}>
                    {name}
                </Typography.Title>
            )}
            <Typography.Title level={1} className={styles.value}>
                {value}
            </Typography.Title>
            {description && (
                <Typography.Title level={5} className={styles.description}>
                    {description}
                </Typography.Title>
            )}
        </div>
    );
};
