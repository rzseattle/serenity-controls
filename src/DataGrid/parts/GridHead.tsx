import React, { useEffect, useLayoutEffect, useRef } from "react";
import { IGridColumn } from "../interfaces/IGridColumn";
import { IGridOrder } from "../interfaces/IGridOrder";
import { IGridFilter } from "../interfaces/IGridFilter";
import { IOrderChange } from "../interfaces/IOrderChangeCallback";
import { IFiltersChange } from "../interfaces/IFiltersChange";
import GridHeadColumn from "./GridHeadColumn";
import { isColumnAssignedElement, isGridColumnElementEqual } from "../helpers/helpers";
import GridConditionsPresenter from "./GridConditionsPresenter";

const GridHead = <T,>({
    columns,
    order,
    onOrderChange,
    filters,
    onFiltersChange,
}: {
    columns: IGridColumn<T>[];
    order: IGridOrder[];
    onOrderChange: IOrderChange;
    filters: IGridFilter[];
    onFiltersChange: IFiltersChange;
}) => {
    const presenterVisible =
        filters.filter((f) => f.value && f.value.length > 0).length > 0 || order.filter((o) => o.dir).length > 0;
    const firstRow = useRef<HTMLDivElement>();
    const presenterRow = useRef<HTMLDivElement>();


    useEffect(() => {
        if (presenterVisible) {
            presenterRow.current.style.top = firstRow.current.firstElementChild.getBoundingClientRect().height + "px";
        }
    }, [columns, order, filters]);

    return (
        <div className={"w-grid-header"}>
            <div className="w-grid-header-row w-grid-header-row-column-headers" ref={firstRow}>
                {columns.map((column) => {
                    return (
                        <GridHeadColumn
                            key={column.field}
                            column={column}
                            isOrderable={order.filter((element) => isColumnAssignedElement(element, column)).length > 0}
                            orderDir={order.filter((element) => isColumnAssignedElement(element, column))[0].dir}
                            onOrderChange={() => {
                                const newOrder = [
                                    ...order.filter(
                                        (el) => el.dir !== undefined && !isColumnAssignedElement(el, column),
                                    ),
                                    ...order
                                        .filter((element) => isColumnAssignedElement(element, column))
                                        .map((el) => {
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
                                        (el) => el.dir === undefined && !isColumnAssignedElement(el, column),
                                    ),
                                ];

                                onOrderChange(newOrder);
                            }}
                            filters={filters.filter((element) => isColumnAssignedElement(element, column))}
                            onFiltersChange={(changed) => {
                                onFiltersChange([
                                    ...filters.map((filter) => {
                                        changed.forEach((filterChanged) => {
                                            if (isGridColumnElementEqual(filter, filterChanged)) {
                                                filter = filterChanged;
                                            }
                                        });
                                        return filter;
                                    }),
                                ]);
                            }}
                        />
                    );
                })}
            </div>
            {presenterVisible && (
                <div className="w-grid-header-row w-grid-header-conditions">
                    <div ref={presenterRow} style={{ gridColumn: "1 / span " + columns.length }}>
                        <GridConditionsPresenter
                            order={order}
                            onOrderChange={onOrderChange}
                            filters={filters}
                            onFiltersChange={onFiltersChange}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default GridHead;
