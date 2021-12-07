import { IGridColumnData } from "./IGridColumnData";

export type IGridCellTemplate<T> = (row: T, column: IGridColumnData<T>) => string | JSX.Element;
