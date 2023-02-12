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

const { Text, Title } = Typography;

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
            <Title style={{ marginBottom: 0, marginTop: "30px" }}>
                MeReStorage
            </Title>
            <Title style={{ marginTop: "10px" }} level={4}>
                Сервис долгосрочного хранения метрик и генерации отчетов
            </Title>
            <ProjectSelect
                style={{
                    marginTop: "10px",
                    width: "250px",
                }}
                size="large"
            />
            <div className={styles.blockGrid}>
                <div>
                    <SecurityScanOutlined className={styles.icon} />
                    <Text>
                        Позволяет собирать метрики с определенной периодичностью
                        и хранить их продолжительное время
                    </Text>
                </div>
                <div>
                    <FileOutlined className={styles.icon} />
                    <Text>
                        Позволяет преобразовывать данные и генерировать отчеты
                    </Text>
                </div>
                <div>
                    <InteractionOutlined className={styles.icon} />
                    <Text>
                        Используются абстракции над источниками данных, возможно
                        создать адаптер для любой системы хранения
                    </Text>
                </div>
            </div>
        </Wrapper>
    );
};

export default MainPage;
