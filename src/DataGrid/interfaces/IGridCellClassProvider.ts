import { IGridColumn } from "./IGridColumn";
import { ICellCoordinates } from "./ICellCoordinates";

export type IGridCellClassProvider<Row> = (row: Row, cell: IGridColumn<Row>, coordinates: ICellCoordinates) => string[];
