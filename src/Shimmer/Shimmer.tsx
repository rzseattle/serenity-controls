import styles from "./Shimmer.module.sass";
import React from "react";

const Shimmer = ({ style = {} }: { style?: React.CSSProperties }) => {
    return <div className={styles.shimmer} style={style}></div>;
};

export { Shimmer };
