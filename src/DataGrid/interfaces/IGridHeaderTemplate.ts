import { IGridColumn } from "./IGridColumn";

export type IGridHeaderTemplate<T = any> = ({
    column,
    defaultClassName,
    triggerFiltersShow,
}: {
    column: IGridColumn<T>;
    defaultClassName: string;
    triggerFiltersShow: () => any;
}) => string | JSX.Element;
