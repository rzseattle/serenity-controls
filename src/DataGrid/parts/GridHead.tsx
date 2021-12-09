import React from "react";
import { IGridColumnData } from "../interfaces/IGridColumnData";

const GridHead = <T,>({ columns }: { columns: IGridColumnData<T>[] }) => {
    return (
        <>
            {columns.map((column) => {
                return <div key={column.field}>{column.header.caption}</div>;
            })}
        </>
    );
};

export default GridHead;
