import React from "react";
import { IGridColumn } from "../interfaces/IGridColumn";
import { IGridOrder } from "../interfaces/IGridOrder";
import { IGridFilter } from "../interfaces/IGridFilter";
import { IOrderChange } from "../interfaces/IOrderChangeCallback";
import { IFiltersChange } from "../interfaces/IFiltersChange";
import GridHeadColumn from "./GridHeadColumn";

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
                        order={order}
                        onOrderChange={onOrderChange}
                        filters={filters}
                        onFiltersChange={onFiltersChange}
                    />
                );
            })}
        </div>
    );
};

export default GridHead;
