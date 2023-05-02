import { Typography } from "antd";
import React from "react";
import { Line } from "@ant-design/plots";
import { ChartValueType } from "../../../../../common/types/reports/responses/ChartResponse";

import styles from "./Chart.module.scss";

type Props = {
    values: ChartValueType;
    name?: string;
    description?: string;
};

export const Chart: React.FC<Props> = ({ values, name, description }) => {
    const config = {
        data: values,
        xField: "date",
        yField: "value",
        seriesField: "type",
        xAxis: {
            tickCount: 5,
        },
    };

    return (
        <div className={styles.wrapper}>
            {name && (
                <Typography.Title level={3} className={styles.name}>
                    {name}
                </Typography.Title>
            )}
            {description && (
                <Typography.Title level={5} className={styles.description}>
                    {description}
                </Typography.Title>
            )}

            <Line {...config} />
        </div>
    );
};
