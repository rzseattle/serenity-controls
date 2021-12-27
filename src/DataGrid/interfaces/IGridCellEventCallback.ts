import { IGridColumn } from "./IGridColumn";
import React from "react";

export type IGridCellEventCallback<T> = ({
    row,
    column,
    event,
    coordinates,
}: {
    row: T;
    column: IGridColumn<T>;
    event: React.MouseEvent<HTMLElement>;
    coordinates: { row: number; column: number };
    // refresh: {
    //     cell: () => void;
    //     row: () => void;
    //     grid: () => void;
    // };
}) => unknown;
