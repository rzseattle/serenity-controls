import { IGridColumn } from "./IGridColumn";

export type IGridCellTemplate<T> = ({
    row,
    column,
    coordinates,
}: {
    row: T;
    column: IGridColumn<T>;
    coordinates: { row: number; column: number };
}) => string | number | JSX.Element;

