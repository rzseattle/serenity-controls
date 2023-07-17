import { IGridColumn } from "./IGridColumn";
import { IGridController } from "./IGridController";

export type IGridHeaderTemplate<T = any> = ({
    column,
    defaultClassName,
    triggerFiltersShow,
    controller,
    forceRenderGrid,
}: {
    column: IGridColumn<T>;
    defaultClassName: string;
    triggerFiltersShow: () => any;
    controller: IGridController<T>;
    forceRenderGrid: () => void;
}) => string | JSX.Element;
