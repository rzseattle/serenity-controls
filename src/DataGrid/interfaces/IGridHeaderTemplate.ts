import { IGridColumn } from "./IGridColumn";

export type IGridHeaderTemplate<T> = ({ column }: { column: IGridColumn<T> }) => string | JSX.Element;
