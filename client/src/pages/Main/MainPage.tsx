import { Typography } from "antd";
import React from "react";
import { ProjectSelect } from "../../components/ProjectSelect/ProjectSelect";
import { Wrapper } from "../../components/Wrapper/Wrapper";
import {
    FileOutlined,
    InteractionOutlined,
    SecurityScanOutlined,
} from "@ant-design/icons";

import styles from "./Main.module.scss";

const MainPage: React.FC = () => {
    return (
        <Wrapper
            style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <Typography.Title style={{ marginBottom: 0, marginTop: "30px" }}>
                MeReStorage
            </Typography.Title>
            <Typography.Title style={{ marginTop: "10px" }} level={4}>
                Сервис долгосрочного хранения метрик и генерации отчетов
            </Typography.Title>
            <ProjectSelect
                style={{
                    marginTop: "10px",
                    width: "250px",
                }}
                size="large"
                navigateAfterSelect
            />
            <div className={styles.blockGrid}>
                <div>
                    <SecurityScanOutlined className={styles.icon} />
                    <Typography.Text>
                        Позволяет собирать метрики с определенной периодичностью
                        и хранить их продолжительное время
                    </Typography.Text>
                </div>
                <div>
                    <FileOutlined className={styles.icon} />
                    <Typography.Text>
                        Позволяет преобразовывать данные и генерировать отчеты
                    </Typography.Text>
                </div>
                <div>
                    <InteractionOutlined className={styles.icon} />
                    <Typography.Text>
                        Используются абстракции над источниками данных, возможно
                        создать адаптер для любой системы хранения
                    </Typography.Text>
                </div>
            </div>
        </Wrapper>
    );
};

export default MainPage;
