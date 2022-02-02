import * as React from "react";
import styles from "./Row.module.sass";

export interface IRowProps {
    children?: any;
    cols?: number[];
    noGutters?: boolean;
}

const Row = (props: IRowProps) => {
    let children = React.Children.toArray(props.children);
    children = children.filter((el) => el != null && el);

    let colMd = 0;
    let colsMd: number[] = [];


    const childrenLength = Math.min( 12, children.length)

    // if detailed width delivered
    if (props.cols) {
        const sum = props.cols.reduce((a, b) => a + b, 0);
        if (sum > 12) {
            throw new Error(`To many columns ${sum}`);
        }
        // calculating width for rest of columns
        colMd = (12 - sum) / (childrenLength - props.cols.length);
        colsMd = Object.assign({}, props.cols);
    } else {
        // equal width for each element
        colMd = 12 / childrenLength;
    }



    // adding calculated default row width
    for (let i = colsMd.length; i < 12; i++) {
        colsMd[i] = Math.floor(colMd);
    }

    return (
        <div className={styles.row + " " + (props.noGutters ? styles.noGutters : "")}>
            {children.map((child, key) => (
                <div key={key} className={"row-el-" + colsMd[key]}>
                    {child}
                </div>
            ))}
        </div>
    );
};
export { Row };
