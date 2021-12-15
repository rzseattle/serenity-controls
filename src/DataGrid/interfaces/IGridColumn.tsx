import { IFilter } from "../../filters";
import { IGridCellEventCallback } from "./IGridCellEventCallback";
import { IGridCellTemplate } from "./IGridCellTemplate";
import { IGridHeaderEventCallback } from "./IGridHeaderEventCallback";
import { IGridSorterValue } from "./IGridSorter";

export interface IGridColumn<T> {
    field?: Extract<keyof T, string | number>;
    name?: string;
    orderField?: string;
    display?: boolean;
    width?: number;
    minWidth?: number;
    maxWidth?: number;
    type?: string;
    rowSpan?: number;

    cell?: {
        class?: string[];
        classTemplate?: (row: T, column: IGridColumn<T>) => string[];
        styleTemplate?: (row: T, column: IGridColumn<T>) => any;
        template?: IGridCellTemplate<T>;
        toolTip?: IGridCellTemplate<T>;
        append?: string | JSX.Element;
        prepend?: string | JSX.Element;
        default?: string;
        icon?: string;
        events?: {
            click?: IGridCellEventCallback<T>[];
            headerClick?: IGridCellEventCallback<T>[];
            mouseUp?: IGridCellEventCallback<T>[];
            enter?: IGridCellEventCallback<T>[];
            leave?: IGridCellEventCallback<T>[];
            doubleClick?: IGridCellEventCallback<T>[];
        };
    };
    header?: {
        icon?: string;
        tooltip?: string;
        caption?: string;
        events?: {
            click?: IGridHeaderEventCallback<T>[];
        };
    };
    isSortable?: boolean;
    filter?: IFilter[];
    order?: IGridSorterValue;
}
