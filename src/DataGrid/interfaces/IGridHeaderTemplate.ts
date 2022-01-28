import { IGridColumn } from "./IGridColumn";

export type IGridHeaderTemplate<T> = ({
    column,
    defaultClassName,
    triggerFiltersShow,
}: {
    column: IGridColumn<T>;
    defaultClassName: string;
    triggerFiltersShow: () => any;
}) => string | JSX.Element;
