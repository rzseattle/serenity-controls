import React from "react";
import { IGridColumn } from "./IGridColumn";
import { ICellCoordinates } from "./ICellCoordinates";
export type IGridCellStyleProvider<Row = any> = ({
    row,
    column,
    coordinates,
}: {
    row: Row;
    column: IGridColumn<Row>;
    coordinates: ICellCoordinates;
}) => React.CSSProperties;
