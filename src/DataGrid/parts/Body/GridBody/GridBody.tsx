import React from "react";
import { IGridColumn } from "../../../interfaces/IGridColumn";
import styles from "./GridBody.module.sass";
import { IGridRowClassProvider } from "../../../interfaces/IGridRowClassProvider";
import { IGridCellClassProvider } from "../../../interfaces/IGridCellClassProvider";
import { IGridCellStyleProvider } from "../../../interfaces/IGridCellStyleProvider";
import GridRow from "../GridRow/GridRow";
import { IGridController } from "../../../interfaces/IGridController";

export interface IGridBodyProps<T> {
    columns: IGridColumn<T>[];
    keyField?: string | number;
    rows: T[];
    rowClassTemplate?: IGridRowClassProvider<T>;
    cellClassTemplate?: IGridCellClassProvider<T>;
    cellStyleTemplate?: IGridCellStyleProvider<T>;
    controller?: IGridController
}

const GridBody = <T,>(props: IGridBodyProps<T>) => {
    const rows = props.rows;

    let keyField: string | number | null = null;

    if (rows.length > 0) {
        if (props.keyField !== undefined) {
            keyField = props.keyField;
        } else {
            if ("id" in rows[0]) {
                keyField = "id";
            } else if ("key" in rows[0]) {
                keyField = "key";
            }
        }
    }
    return (
        <>
            {rows.map((row, rowNumber) => {
                const rowProperties: React.HTMLAttributes<HTMLDivElement> = {};
                let rowClass = styles.row;
                if (props.rowClassTemplate !== undefined && props.rowClassTemplate !== null) {
                    rowClass = [...(props.rowClassTemplate({ row, index: rowNumber }) ?? []), styles.row].join(" ");
                }
                rowProperties.className = rowClass;

                return (
                    <GridRow
                        rowProperties={rowProperties}
                        rowNumber={rowNumber}
                        key={keyField !== null ? row[keyField as keyof T] + "" : "row_" + rowNumber}
                        row={row}
                        columns={props.columns}
                        cellStyleTemplate={props.cellStyleTemplate}
                        cellClassTemplate={props.cellClassTemplate}
                        controller={props.controller}
                    />
                );
            })}
        </>
    );
};

export default GridBody;
