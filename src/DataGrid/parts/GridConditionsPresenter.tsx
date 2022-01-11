import React from "react";
import { IGridOrder } from "../interfaces/IGridOrder";
import { IOrderChange } from "../interfaces/IOrderChangeCallback";
import { IGridFilter } from "../interfaces/IGridFilter";
import { IFiltersChange } from "../interfaces/IFiltersChange";
import { useGridContext } from "../config/GridContext";
import { isGridColumnElementEqual } from "../helpers/helpers";
import produce from "immer";

const GridConditionsPresenter = ({
    order,
    onOrderChange,
    filters,
    onFiltersChange,
}: {
    order: IGridOrder[];
    onOrderChange: IOrderChange;
    filters: IGridFilter[];
    onFiltersChange: IFiltersChange;
}) => {
    const context = useGridContext();

    return (
        <div className={"w-grid-conditions-presenter"}>
            {order
                .filter((el) => el.dir)
                .map((el) => {
                    return (
                        <div
                            key={el.field + "" + el.applyTo}
                            onClick={() => {
                                onOrderChange([
                                    ...order.map((order) => {
                                        if (isGridColumnElementEqual(order, el)) {
                                            order.dir = order.dir === "asc" ? "desc" : "asc";
                                        }

                                        return order;
                                    }),
                                ]);
                            }}
                        >
                            <div>
                                {context.order.icons[el.dir]} {el.field}
                            </div>
                            <div
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onOrderChange([
                                        ...order.map((order) => {
                                            if (isGridColumnElementEqual(order, el)) {
                                                order.dir = undefined;
                                            }

                                            return order;
                                        }),
                                    ]);
                                }}
                                className={"w-grid-conditions-close"}
                            >
                                {context.common.icons.delete}
                            </div>
                        </div>
                    );
                })}

            {filters
                .filter((el) => el.value && el.value.length > 0)
                .map((filter) => {
                    return (
                        <div
                            key={filter.field + "" + filter.applyTo}
                            onClick={() => {
                                onFiltersChange(
                                    produce(filters, (draft) => {
                                        draft.map((sub) => {
                                            if (isGridColumnElementEqual(sub, filter)) {
                                                sub.opened = true;
                                            }
                                            return sub;
                                        });
                                    }),
                                );
                            }}
                        >
                            <div>{context.filter.icons.filter}</div>
                            <div>{filter.caption ?? filter.field}</div>
                            <div style={{ textAlign: "left" }}>
                                {filter.value.map((value, index) => {
                                    return (
                                        <div key={index + value.value}>
                                            {value.labelCondition ?? value.condition} {value.labelValue ?? value.value}{" "}
                                        </div>
                                    );
                                })}
                            </div>
                            <div
                                className={"w-grid-conditions-close"}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onFiltersChange(
                                        produce(filters, (draft) => {
                                            draft.map((sub) => {
                                                if (isGridColumnElementEqual(sub, filter)) {
                                                    sub.value = [];
                                                }
                                                return sub;
                                            });
                                        }),
                                    );
                                }}
                            >
                                {context.common.icons.delete}
                            </div>
                        </div>
                    );
                })}
        </div>
    );
};

export default GridConditionsPresenter;
