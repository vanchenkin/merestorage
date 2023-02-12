import { Spin } from "antd";
import React from "react";

export const Loader: React.FC = () => {
    return (
        <div
            style={{
                width: "100%",
                height: "75vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Spin />
        </div>
    );
};
