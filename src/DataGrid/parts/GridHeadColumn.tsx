import React from "react";
import { IGridColumn, IGridHeaderEvents } from "../interfaces/IGridColumn";
import { IGridHeaderEventCallback } from "../interfaces/IGridHeaderEventCallback";
import styles from "./GridHead.module.sass";
import { useGridContext } from "../config/GridContext";
import { IGridOrder } from "../interfaces/IGridOrder";
import { IOrderChange } from "../interfaces/IOrderChangeCallback";
import { IGridFilter } from "../interfaces/IGridFilter";
import { IFiltersChange } from "../interfaces/IFiltersChange";
import { isColumnAssignedElement } from "../helpers/helpers";

const GridHeadColumn = <T,>({
    column,
    order,
    onOrderChange,
    filters,
    onFiltersChange,
}: {
    column: IGridColumn<T>;
    order: IGridOrder[];
    onOrderChange: IOrderChange;

    filters: IGridFilter[];
    onFiltersChange: IFiltersChange;
}) => {
    const config = useGridContext();
    const cellProperties: React.HTMLAttributes<HTMLDivElement> = {};

    const columnOrder = order.filter((el) => isColumnAssignedElement(el, column));
    const columnFilter = filters.filter((el) => isColumnAssignedElement(el, column));

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
                ...order.filter((el) => el.dir !== undefined && !isColumnAssignedElement(el, column)),
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
                ...order.filter((el) => el.dir === undefined && !isColumnAssignedElement(el, column)),
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
                className={"w-grid-header-cell-in " + (cellProperties.onClick ? "w-grid-header-cell-in-clickable" : "")}
            >
                {column.header?.caption ?? column.field}
                {columnOrder.length > 0 && columnOrder[0].dir && (
                    <div className={"w-grid-header-cell-in-order"}>{config.order.icons[columnOrder[0].dir]}</div>
                )}
                {columnFilter.length > 0 && (
                    <>
                        <div
                            className={"w-grid-header-cell-in-filter"}
                            onClick={(e) => {
                                e.stopPropagation();
                                onFiltersChange([
                                    ...filters.map((filter) => {
                                        filter.opened = !filter.opened;
                                        return filter;
                                    }),
                                ]);
                            }}
                        >
                            {config.filter.icons.filter}
                        </div>
                        {columnFilter[0].opened && (
                            <div onClick={(e) => e.stopPropagation()}>
                                {columnFilter.map((filter) => {
                                    const Component = filter.component ?? config.filter.components[filter.filterType];
                                    return (
                                        <>
                                            {Component ? (
                                                <Component
                                                    filter={filter}
                                                    onApply={(value, hide) => {
                                                        onFiltersChange([
                                                            ...filters.map((filter) => {
                                                                if (isColumnAssignedElement(filter, column)) {
                                                                    filter.value = value;
                                                                    if (hide === true) {
                                                                        filter.opened = false;
                                                                    }
                                                                    return filter;
                                                                }
                                                            }),
                                                        ]);
                                                    }}
                                                />
                                            ) : (
                                                "No filter found"
                                            )}
                                        </>
                                    );
                                })}
                            </div>
                        )}
                    </>
                )}
            </div>
        );

        return (
            <div className={styles.headerCell} {...cellProperties}>
                {child}
            </div>
        );
    }
};

export default GridHeadColumn;
