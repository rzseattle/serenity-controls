import { IGridColumn } from "./IGridColumn";
import { ICellCoordinates } from "./ICellCoordinates";

export type IGridCellClassProvider<Row> = ({
    row,
    column,
    coordinates,
}: {
    row: Row;
    column: IGridColumn<Row>;
    coordinates: ICellCoordinates;
}) => string[];
