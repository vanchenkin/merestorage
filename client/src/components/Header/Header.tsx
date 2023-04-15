import { Menu, MenuProps } from "antd";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ProjectSelect } from "../ProjectSelect/ProjectSelect";

const items: MenuProps["items"] = [
    {
        label: "Отчеты",
        key: "reports",
    },
    {
        label: "Метрики",
        key: "metrics",
    },
    {
        label: "Ресурсы",
        key: "resources",
    },
];

type HeaderProps = {
    hideMenu?: boolean;
};

export const Header: React.FC<HeaderProps> = ({ hideMenu }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const currentKey = items
        .filter((item) => location.pathname.includes(item?.key as string))
        .map((item) => item?.key as string);

    const handleSelect = (item: { key: string }) => {
        navigate(item.key);
    };

    return (
        <>
            <Link to="/">MeReStorage</Link>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "end",
                    alignItems: "center",
                    width: "100%",
                }}
            >
                {!hideMenu && (
                    <div style={{ width: "100%" }}>
                        <Menu
                            style={{
                                minWidth: 0,
                                justifyContent: "end",
                            }}
                            mode="horizontal"
                            items={items}
                            selectedKeys={currentKey}
                            onClick={handleSelect}
                        />
                    </div>
                )}

                <ProjectSelect />
            </div>
        </>
    );
};
