import { IGridColumnData } from "./IGridColumnData";
import React from "react";

export type IGridHeaderEventCallback<T> = (column: IGridColumnData<T>, event: React.MouseEvent<HTMLElement>) => any;
