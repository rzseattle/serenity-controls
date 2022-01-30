import { IGridColumn } from "./IGridColumn";
import React from "react";

export type IGridHeaderEventCallback<T> = ({
    column,
    event,
}: {
    column: IGridColumn<T>;
    event: React.MouseEvent<HTMLElement>;
}) => any;
