import { IGridColumn } from "./IGridColumn";
import React from "react";

export type IGridCellEventCallback<T, E> = ({
    row,
    column,
    event,
    coordinates,
}: {
    row: T;
    column: IGridColumn<T>;
    event: E;
    coordinates: { row: number; column: number };
    // refresh: {
    //     cell: () => void;
    //     row: () => void;
    //     grid: () => void;
    // };
}) => unknown;
