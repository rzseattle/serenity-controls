import React from "react";
import { IGridColumn } from "../interfaces/IGridColumn";
import { IGridOrder } from "../interfaces/IGridOrder";
import { IGridFilter } from "../interfaces/IGridFilter";
import { IOrderChange } from "../interfaces/IOrderChangeCallback";
import { IFiltersChange } from "../interfaces/IFiltersChange";
import GridHeadColumn from "./GridHeadColumn";
import { isColumnAssignedElement } from "../helpers/helpers";

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
    return (
        <div className="w-grid-header-row">
            {columns.map((column) => {
                return (
                    <GridHeadColumn
                        key={column.field}
                        column={column}
                        order={order.filter((element) => isColumnAssignedElement(element, column))}
                        onOrderChange={(changed) => {

                        }}
                        filters={filters.filter((element) => isColumnAssignedElement(element, column))}
                        onFiltersChange={(changed) => {

                        }}
                    />
                );
            })}
        </div>
    );
};

export default GridHead;
