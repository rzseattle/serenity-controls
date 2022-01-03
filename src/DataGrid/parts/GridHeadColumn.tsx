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
    isOrderable,
    onOrderChange,
    filters,
    onFiltersChange,
    orderDir,
}: {
    column: IGridColumn<T>;
    isOrderable: boolean;
    orderDir: null | "asc" | "desc";
    onOrderChange: () => void;
    filters: IGridFilter[];
    onFiltersChange: IFiltersChange;
}) => {
    const config = useGridContext();
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

    if (isOrderable) {
        const currOnClick = cellProperties["onClick"];
        cellProperties["onClick"] = (event) => {
            onOrderChange();
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
                {isOrderable && orderDir !== null && (
                    <div className={"w-grid-header-cell-in-order"}>{config.order.icons[orderDir]}</div>
                )}
                {filters.length > 0 && (
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
                        {filters[0].opened && (
                            <div onClick={(e) => e.stopPropagation()}>
                                {filters.map((filter) => {
                                    const Component = filter.component ?? config.filter.components[filter.filterType];
                                    return (
                                        <>
                                            {Component ? (
                                                <Component
                                                    key={filter.field + "" + filter.applyTo}
                                                    filter={filter}
                                                    hide={() => {
                                                        filter.opened = false;
                                                        onFiltersChange([filter]);
                                                    }}
                                                    onApply={(value) => {
                                                        filter.value = value;
                                                        onFiltersChange([filter]);
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
