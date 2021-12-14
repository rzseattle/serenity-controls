import { IFilter } from "../../filters";
import { IGridCellEventCallback } from "./IGridCellEventCallback";
import { IGridCellTemplate } from "./IGridCellTemplate";
import { IGridHeaderEventCallback } from "./IGridHeaderEventCallback";

// eslint-disable-next-line @typescript-eslint/ban-types
export interface IGridColumnData<T> {
    field?: Extract<keyof T, string | number>;
    orderField?: string;
    isSortable?: boolean;
    display?: boolean;
    width?: number;
    minWidth?: number;
    maxWidth?: number;
    type?: string;
    rowSpan?: number;
    order?: string;
    cell?: {
        class?: string[];
        classTemplate?: (row: T, column: IGridColumnData<T>) => string[];
        styleTemplate?: (row: T, column: IGridColumnData<T>) => any;
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
    filter?: IFilter[];
}
