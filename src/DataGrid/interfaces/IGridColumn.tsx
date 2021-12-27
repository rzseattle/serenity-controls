import { IFilter } from "../../filters";
import { IGridCellEventCallback } from "./IGridCellEventCallback";
import { IGridCellTemplate } from "./IGridCellTemplate";
import { IGridHeaderEventCallback } from "./IGridHeaderEventCallback";
import { IGridOrderValue } from "./IGridOrder";
import { ICellCoordinates } from "./ICellCoordinates";
import { IGridHeaderTemplate } from "./IGridHeaderTemplate";

export interface IGridCellEvents<T> {
    onClick?: IGridCellEventCallback<T>[];
    onMouseUp?: IGridCellEventCallback<T>[];
    onMouseEnter?: IGridCellEventCallback<T>[];
    onMouseOut?: IGridCellEventCallback<T>[];
    onDoubleClick?: IGridCellEventCallback<T>[];
}

export interface IGridHeaderEvents<T> {
    onClick?: IGridHeaderEventCallback<T>[];
    onMouseUp?: IGridHeaderEventCallback<T>[];
    onMouseEnter?: IGridHeaderEventCallback<T>[];
    onMouseOut?: IGridHeaderEventCallback<T>[];
    onDoubleClick?: IGridHeaderEventCallback<T>[];
}

export interface IGridColumn<T> {
    field?: Extract<keyof T, string | number>;
    name?: string;
    orderField?: string;
    display?: boolean;
    width?: number | string | "min-content" | "max-content" | "auto";
    minWidth?: number | string | "min-content" | "max-content" | "auto";
    maxWidth?: number | string | "min-content" | "max-content" | "auto";
    type?: string;
    rowSpan?: number;

    cell?: {
        class?: string[];
        classTemplate?: (row: T, column: IGridColumn<T>, cellLookup: ICellCoordinates) => string[];
        styleTemplate?: (row: T, column: IGridColumn<T>, cellLookup: ICellCoordinates) => any;
        template?: IGridCellTemplate<T>;
        toolTip?: IGridCellTemplate<T>;
        append?: string | JSX.Element;
        prepend?: string | JSX.Element;
        default?: string;
        icon?: string;
        events?: IGridCellEvents<T>;
    };
    header?: {
        icon?: string;
        tooltip?: string;
        caption?: string;
        events?: IGridHeaderEvents<T>;
        template?: IGridHeaderTemplate<T>;
    };
    isSortable?: boolean;
    filter?: IFilter[];
    order?: IGridOrderValue;
}
