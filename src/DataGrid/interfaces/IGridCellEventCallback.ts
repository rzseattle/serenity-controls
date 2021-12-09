import { IGridColumnData } from "./IGridColumnData";
import React from "react";

export type IGridCellEventCallback<T> = (
    row: T,
    column: IGridColumnData<T>,
    event: React.MouseEvent<HTMLElement>,
) => any;
