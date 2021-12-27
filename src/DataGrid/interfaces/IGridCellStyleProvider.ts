import React from "react";
import { IGridColumn } from "./IGridColumn";
import { ICellCoordinates } from "./ICellCoordinates";
export type IGridCellStyleProvider<Row> = (
    row: Row,
    cell: IGridColumn<Row>,
    coordinates: ICellCoordinates,
) => React.CSSProperties;
