import React, { useEffect, useRef } from "react";
import { IGridColumn } from "../../../interfaces/IGridColumn";
import { IGridOrder } from "../../../interfaces/IGridOrder";
import { IGridFilter } from "../../../interfaces/IGridFilter";
import { IOrderChange } from "../../../interfaces/IOrderChangeCallback";
import { IFiltersChange } from "../../../interfaces/IFiltersChange";

import { isColumnAssignedElement, isGridColumnElementEqual } from "../../../helpers/helpers";
import produce from "immer";
import GridHeadColumn from "../GridHeadColumn/GridHeadColumn";
import styles from "./GridHead.module.sass";
import GridConditionsPresenter from "../../Addons/GridConditionsPresenter/GridConditionsPresenter";
import { IGridController } from "../../../interfaces/IGridController";

const GridHead = <T,>({
    columns,
    order,
    onOrderChange,
    filters,
    onFiltersChange,
    controller,
}: {
    columns: IGridColumn<T>[];
    order: IGridOrder[];
    onOrderChange: IOrderChange;
    filters: IGridFilter[];
    onFiltersChange: IFiltersChange;
    controller?: IGridController;
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
        <>
            <div className={styles.gridHeaderRow} ref={firstRow}>
                {columns.map((column) => {
                    return (
                        <GridHeadColumn
                            key={column.field + column.name ?? ""}
                            controller={controller}
                            column={column}
                            isOrderable={order.filter((element) => isColumnAssignedElement(element, column)).length > 0}
                            orderDir={order.filter((element) => isColumnAssignedElement(element, column))[0]?.dir}
                            onOrderChange={(newDirection) => {
                                const newOrder = [
                                    ...order.filter(
                                        (el) => el.dir !== undefined && !isColumnAssignedElement(el, column),
                                    ),
                                    ...produce(
                                        order.filter((element) => isColumnAssignedElement(element, column)),
                                        (draft) => {
                                            draft.map((el) => {
                                                el.dir = newDirection;
                                                return el;
                                            });
                                        },
                                    ),
                                    ...order.filter(
                                        (el) => el.dir === undefined && !isColumnAssignedElement(el, column),
                                    ),
                                ];

                                if (onOrderChange) {
                                    onOrderChange(newOrder);
                                }
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
                <div className={styles.gridHeaderRow}>
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
        </>
    );
};

export default GridHead;
