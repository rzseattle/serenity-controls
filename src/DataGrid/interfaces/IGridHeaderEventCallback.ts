import { IGridColumn } from "./IGridColumn";
import React from "react";
import { IGridController } from "./IGridController";

export type IGridHeaderEventCallback<T> = ({
    column,
    event,
    controller,
}: {
    column: IGridColumn<T>;
    event: React.MouseEvent<HTMLElement>;
    controller?: IGridController;
}) => any;
