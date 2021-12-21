import React from "react";
import { IGridCellEvents, IGridColumn } from "../interfaces/IGridColumn";
import styles from "./GridBody.module.sass";
import { nanoid } from "nanoid";
import { IGridRowClassProvider } from "../interfaces/IGridRowClassProvider";
import { IGridRowStyleProvider } from "../interfaces/IGridRowStyleProvider";
import { IGridCellClassProvider } from "../interfaces/IGridCellClassProvider";
import { IGridCellStyleProvider } from "../interfaces/IGridCellStyleProvider";
import { IGridCellEventCallback } from "../interfaces/IGridCellEventCallback";
interface IGridBodyProps<T> {
    columns: IGridColumn<T>[];
    rows: T[];
    rowClassTemplate?: IGridRowClassProvider<T>;
    rowStyleTemplate?: IGridRowStyleProvider<T>;
    cellClassTemplate?: IGridCellClassProvider<T>;
    cellStyleTemplate?: IGridCellStyleProvider<T>;
}

const GridBody = <T,>(props: IGridBodyProps<T>) => {
    const rows = props.rows;
    const columns = props.columns;

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
            {rows.map((row, index) => {
                const rowProperties: React.HTMLAttributes<HTMLDivElement> = {};
                let rowClass = styles.row;
                if (props.rowClassTemplate !== undefined && props.rowClassTemplate !== null) {
                    rowClass = [...props.rowClassTemplate(row, index), styles.row].join(" ");
                }
                rowProperties.className = rowClass;

                if (props.rowStyleTemplate !== undefined && props.rowStyleTemplate !== null) {
                    rowProperties.style = props.rowStyleTemplate(row, index);
                }

                return (
                    <div key={getKey(row)} {...rowProperties}>
                        {columns.map((column, cellIndex) => {
                            const cellProperties: React.HTMLAttributes<HTMLDivElement> = {};

                            if (props.cellClassTemplate !== undefined && props.cellClassTemplate !== null) {
                                cellProperties.className = props.cellClassTemplate(row, column, cellIndex).join(" ");
                            }

                            if (props.cellStyleTemplate !== undefined && props.cellStyleTemplate !== null) {
                                cellProperties.style = props.cellStyleTemplate(row, column, cellIndex);
                            }

                            if (column.cell?.events !== undefined) {
                                Object.entries(column.cell.events).map(([key, val]) => {
                                    const event = key as keyof IGridCellEvents<T>;
                                    cellProperties[event] = (ev) => {
                                        val.forEach((callback: IGridCellEventCallback<T>) => {
                                            callback(row, column, ev, { row: index, column: cellIndex });
                                        });
                                    };
                                });
                            }

                            return (
                                <div key={column.field} {...cellProperties}>
                                    {row[column.field]}
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </>
    );
};

export default GridBody;
