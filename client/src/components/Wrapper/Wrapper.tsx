import React, { CSSProperties, ReactNode } from "react";

import styles from "./Wrapper.module.scss";

type WrapperProps = {
    children: ReactNode;
    style?: CSSProperties;
};

export const Wrapper: React.FC<WrapperProps> = ({ children, style }) => {
    return (
        <div className={styles.wrapper} style={style}>
            {children}
        </div>
    );
};
