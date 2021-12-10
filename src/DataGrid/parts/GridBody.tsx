import React from "react";
import { IGridColumnData } from "../interfaces/IGridColumnData";
import styles from "./GridBody.module.sass";
const GridBody = <T,>({ columns, rows }: { rows: T[]; columns: IGridColumnData<T>[] }) => {

    let keyField = null;
    if(rows.length > 0 ){
        if( rows[0].hasOwnProperty('id')){
            keyField = "id"
        }
    }

    //let key= > ()
    // if()
    // row[0]

    return (
        <>
            {rows.map((row) => {
                return (
                    <div key={row["id"]} className={styles.row}>
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
