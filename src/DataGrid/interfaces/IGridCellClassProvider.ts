import { IGridColumn } from "./IGridColumn";

export type IGridCellClassProvider<Row> = (row: Row, cell: IGridColumn<Row>, index: number) => string[];
