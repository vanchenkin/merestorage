import React from "react";
import { ConfigProvider, Empty, Layout } from "antd";
import { Header } from "../Header/Header";
import { Router } from "../Router/Router";
import { useAppSelector } from "../../store/store";

export const App: React.FC = () => {
    const project = useAppSelector((state) => state.context.project);

    return (
        <ConfigProvider renderEmpty={() => <Empty description="Нет данных" />}>
            <Layout>
                <Layout.Header
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        backgroundColor: "white",
                        justifyContent: "space-between",
                        paddingInline: "10%",
                        boxShadow: "0px 2px 8px 0px rgba(240, 241, 242, 1)",
                        zIndex: 100,
                    }}
                >
                    <Header hideMenu={!Boolean(project)} />
                </Layout.Header>
                <Layout.Content style={{ backgroundColor: "white" }}>
                    <Router />
                </Layout.Content>
            </Layout>
        </ConfigProvider>
    );
};
