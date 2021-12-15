import { IGridColumn } from "./IGridColumn";

export type IGridCellTemplate<T> = (row: T, column: IGridColumn<T>) => string | JSX.Element;
