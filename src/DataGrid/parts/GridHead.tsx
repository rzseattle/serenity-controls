import React from "react";
import { IGridColumn, IGridHeaderEvents } from "../interfaces/IGridColumn";
import styles from "./GridHead.module.sass";
import { IGridHeaderEventCallback } from "../interfaces/IGridHeaderEventCallback";

const GridHead = <T,>({ columns }: { columns: IGridColumn<T>[] }) => {
    return (
        <div className="w-grid-header-row">
            {columns.map((column) => {
                const cellProperties: React.HTMLAttributes<HTMLDivElement> = {};

                if (column.header?.events) {
                    Object.entries(column.header.events).map(([key, val]) => {
                        const event = key as keyof IGridHeaderEvents<T>;
                        cellProperties[event] = (event) => {
                            val.forEach((callback: IGridHeaderEventCallback<T>) => {
                                callback({
                                    column,
                                    event,
                                });
                            });
                        };
                    });
                }

                let child;
                if (column.header?.template !== undefined) {
                    child = column.header.template({
                        column,
                    });
                } else {
                    child = <div className="w-grid-header-cell-in">{column.header?.caption ?? column.field}</div>;
                }

                return (
                    <div key={column.field} className={styles.headerCell} {...cellProperties}>
                        {child}

                    </div>
                );
            })}
        </div>
    );
};

export default GridHead;
