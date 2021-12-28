import React from "react";
import { IGridColumn, IGridHeaderEvents } from "../interfaces/IGridColumn";
import styles from "./GridHead.module.sass";
import { IGridHeaderEventCallback } from "../interfaces/IGridHeaderEventCallback";
import { IGridOrder } from "../interfaces/IGridOrder";
import { IGridFilter } from "../interfaces/IGridFilter";
import { useGridContext } from "../config/GridContext";

const GridHead = <T,>({
    columns,
    order,
    onOrderChange,
    filters,
    onFiltersChange,
}: {
    columns: IGridColumn<T>[];
    order: IGridOrder[];
    onOrderChange: (filtersValue: IGridOrder[]) => void;

    filters: IGridFilter[];
    onFiltersChange: (filtersValue: IGridFilter[]) => void;
}) => {
    const config = useGridContext();
    return (
        <div className="w-grid-header-row">
            {columns.map((column) => {
                const cellProperties: React.HTMLAttributes<HTMLDivElement> = {};

                const columnOrder = order.filter((el) => {
                    return (el.applyTo === undefined && el.field === column.field) || el.applyTo === el.field;
                });
                const columnFilter = filters.filter((el) => {
                    return (el.applyTo === undefined && el.field === column.field) || el.applyTo === el.field;
                });

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

                if (columnOrder.length > 0) {
                    const currOnClick = cellProperties["onClick"];

                    cellProperties["onClick"] = (event) => {
                        const newOrder = [
                            ...order.filter(
                                (el) =>
                                    el.dir !== undefined &&
                                    el.field !== column.field &&
                                    (el.applyTo === undefined || el.applyTo !== el.field),
                            ),
                            ...columnOrder.map((el) => {
                                if (el.dir === undefined) {
                                    el.dir = "asc";
                                } else if (el.dir === "asc") {
                                    el.dir = "desc";
                                } else {
                                    el.dir = undefined;
                                }
                                return el;
                            }),
                            ...order.filter(
                                (el) =>
                                    el.dir === undefined &&
                                    el.field !== column.field &&
                                    (el.applyTo === undefined || el.applyTo !== el.field),
                            ),
                        ];

                        onOrderChange(newOrder);
                        if (currOnClick) {
                            currOnClick(event);
                        }
                    };
                }

                let child;
                if (column.header?.template !== undefined) {
                    child = column.header.template({
                        column,
                    });
                } else {
                    child = (
                        <div
                            className={
                                "w-grid-header-cell-in " +
                                (cellProperties.onClick ? "w-grid-header-cell-in-clickable" : "")
                            }
                        >
                            {column.header?.caption ?? column.field}
                            {columnOrder.length > 0 && columnOrder[0].dir && (
                                <div className={"w-grid-header-cell-in-order"}>
                                    {config.icons.order[columnOrder[0].dir]}
                                </div>
                            )}
                            {columnFilter.length > 0 && (
                                <>
                                    <div className={"w-grid-header-cell-in-filter"}>{config.icons.filter}</div>
                                    {columnFilter[0].opened && <div>Tutaj otwarty filtr</div>}
                                </>
                            )}
                        </div>
                    );
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
