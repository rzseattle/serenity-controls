import styles from "./Shimmer.module.sass";
import React from "react";

export interface IShimmerProps {
    style?: React.CSSProperties;
}

const Shimmer = ({ style = {} }: IShimmerProps) => {
    return <div className={styles.shimmer} style={style}></div>;
};

export { Shimmer };
