import React from "react";
import { IGridColumnData } from "../interfaces/IGridColumnData";
import styles from "./GridBody.module.sass";
import { nanoid } from "nanoid";
const GridBody = <T,>({ columns, rows }: { rows: T[]; columns: IGridColumnData<T>[] }) => {
    let keyField: string | null = null;
    if (rows.length > 0) {
        if ("id" in rows[0]) {
            keyField = "id";
        } else if ("key" in rows[0]) {
            keyField = "key";
        }
    }

    const getKey = (row: T): string => {
        if (keyField !== null) {
            return "" + row[keyField as keyof T];
        }
        return nanoid();
    };

    return (
        <>
            {rows.map((row) => {
                return (
                    <div key={getKey(row)} className={styles.row}>
                        {columns.map((column) => {
                            return <div key={column.field}>{row[column.field]}</div>;
                        })}
                    </div>
                );
            })}
        </>
    );
};

export default GridBody;
