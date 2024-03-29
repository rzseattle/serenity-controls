import { IGridColumn } from "./IGridColumn";
import { IGridController } from "./IGridController";

export type IGridCellEventCallback<T, E> = ({
    row,
    column,
    event,
    coordinates,
    controller,
    forceRender,
}: {
    row: T;
    column: IGridColumn<T>;
    event: E;
    coordinates: { row: number; column: number };
    controller: IGridController<T>;
    forceRender: () => void;
}) => unknown;
