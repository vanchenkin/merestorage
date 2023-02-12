import React, { CSSProperties, ReactNode } from "react";

type WrapperProps = {
    children: ReactNode;
    style?: CSSProperties;
};

export const Wrapper: React.FC<WrapperProps> = ({ children, style }) => {
    return (
        <div
            style={{
                paddingInline: "10%",
                paddingTop: "20px",
                ...style,
            }}
        >
            {children}
        </div>
    );
};
