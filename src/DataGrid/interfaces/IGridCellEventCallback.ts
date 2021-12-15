import { IGridColumn } from "./IGridColumn";
import React from "react";

export type IGridCellEventCallback<T> = (
    row: T,
    column: IGridColumn<T>,
    event: React.MouseEvent<HTMLElement>,
) => any;
