import { IGridColumn } from "./IGridColumn";
import React from "react";
import { IGridCellEventCallback } from "./IGridCellEventCallback";



export type IGridHeaderEventCallback<T> = ({
    column,
    event,
}: {
    column: IGridColumn<T>;
    event: React.MouseEvent<HTMLElement>;
}) => any;
