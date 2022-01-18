import React from "react";
import Shimmer from "./Shimmer";

const ShimmerList = ({ rows = 5 }: { rows?: number }) => {
    return (
        <>
            {[...Array(rows)].map((el, index) => (
                <Shimmer key={index} />
            ))}
        </>
    );
};

export default ShimmerList;
