import * as React from "react";
import styles from "./Row.module.sass"


export interface IRowProps {
    children?: any;
    md?: number[];
    noGutters?: boolean;
}

const Row = (props: IRowProps) => {
    let children = React.Children.toArray(props.children);
    children = children.filter((el) => el != null && el);

    let colMd = 0;
    let colsMd: number[] = [];
    // if detailed width delivered
    if (props.md) {
        const sum = props.md.reduce((a, b) => a + b, 0);
        if (sum > 12) {
            throw new Error(`To many columns ${sum}`);
        }
        // calculating width for rest of columns
        colMd = (12 - sum) / (children.length - props.md.length);
        colsMd = Object.assign({}, props.md);
    } else {
        // equal width for each element
        colMd = 12 / children.length;
    }

    // adding calculated default row width
    for (let i = colsMd.length; i < 12; i++) {
        colsMd[i] = Math.floor(colMd);
    }

    const style: any = {};
    if (props.noGutters) {
        style.padding = 0;
        style.margin = 0;
    }
    return (
        <div className={styles.row}>
            {children.map((child, key) => (
                <div key={key} style={style} className={"row-el-" + colsMd[key]}>
                    {child}
                </div>
            ))}
        </div>
    );
};
export { Row };

