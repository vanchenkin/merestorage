import React, { ReactNode } from "react";
import { Typography } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import styles from "./PageHeader.module.scss";

const { Title } = Typography;

type Props = {
    children: ReactNode;
    navigateTo?: string;
};

export const PageHeader: React.FC<Props> = ({ children, navigateTo }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (navigateTo) navigate(navigateTo);
        else navigate(-1);
    };

    return (
        <div className={styles.row}>
            <Title level={4} onClick={handleClick} className={styles.linkText}>
                <ArrowLeftOutlined className={styles.icon} />
                {children}
            </Title>
        </div>
    );
};
