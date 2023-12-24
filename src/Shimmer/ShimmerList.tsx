import React from "react";
import { IShimmerProps, Shimmer } from "./Shimmer";
import styles from "./ShimmerList.module.sass";

const ShimmerList = ({
    items = 5,
    columns = 1,
    shimmerProps = {},
}: {
    items?: number;
    columns?: number;
    shimmerProps?: IShimmerProps;
}) => {
    return (
        <div style={columns === 1 ? {} : { display: "grid", gridTemplateColumns: `repeat(${columns},1fr)` }}>
            {Array.from({ length: items }).map((el, index) => (
                <div key={index} className={styles.row + " " + (columns > 1 ? styles.inlineRow : "")}>
                    <Shimmer style={{ minHeight: 20, minWidth: 20 }} {...shimmerProps} />
                </div>
            ))}
        </div>
    );
};

export { ShimmerList };
