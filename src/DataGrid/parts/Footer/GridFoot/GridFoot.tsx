import React from "react";
import styles from "./GridFoot.module.sass";

const GridFoot = ({ children }: { children: JSX.Element | string }) => {
    return <div className={styles.main}>{children}</div>;
};

export default GridFoot;
