import React from "react";
import { IGridColumn } from "./IGridColumn";
export type IGridCellStyleProvider<Row> = (row: Row, cell: IGridColumn<Row>, index: number) => React.CSSProperties;
