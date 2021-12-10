import React from "react";
import { IGridColumnData } from "../interfaces/IGridColumnData";
import styles from "./GridHead.module.sass";
const GridHead = <T,>({ columns }: { columns: IGridColumnData<T>[] }) => {
    return (
        <div className={styles.row}>
            {columns.map((column) => {
                return (
                    <div key={column.field} className={styles.headerCell}>
                        {column.header.caption}
                    </div>
                );
            })}
        </div>
    );
};

export default GridHead;
