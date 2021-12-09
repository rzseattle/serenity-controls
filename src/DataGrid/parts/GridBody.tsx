import React from "react";
import { IGridColumnData } from "../interfaces/IGridColumnData";

const GridBody = <T,>({ columns, rows }: { rows: T[]; columns: IGridColumnData<T>[] }) => {
    return (
        <>
            {rows.map((row) => {
                return (
                    <>
                        {columns.map((column) => {
                            return <div key={column.field}>{row[column.field]}</div>;
                        })}
                    </>
                );
            })}
        </>
    );
};

export default GridBody;
