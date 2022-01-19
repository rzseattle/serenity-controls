import { IGridCellEventCallback } from "./IGridCellEventCallback";
import { IGridCellTemplate } from "./IGridCellTemplate";
import { IGridHeaderEventCallback } from "./IGridHeaderEventCallback";
import { ICellCoordinates } from "./ICellCoordinates";
import { IGridHeaderTemplate } from "./IGridHeaderTemplate";
import React from "react";

export interface IGridCellEvents<T> {
    onClick?: IGridCellEventCallback<T, React.MouseEvent<HTMLElement>>[];
    onMouseUp?: IGridCellEventCallback<T, React.MouseEvent<HTMLElement>>[];
    onMouseEnter?: IGridCellEventCallback<T, React.MouseEvent<HTMLElement>>[];
    onMouseOut?: IGridCellEventCallback<T, React.MouseEvent<HTMLElement>>[];
    onDoubleClick?: IGridCellEventCallback<T, React.MouseEvent<HTMLElement>>[];
    onDrag?: IGridCellEventCallback<T, React.DragEvent<HTMLElement>>[];
    onDrop?: IGridCellEventCallback<T, React.DragEvent<HTMLElement>>[];
    onDragStart?: IGridCellEventCallback<T, React.DragEvent<HTMLElement>>[];
    onDragOver?: IGridCellEventCallback<T, React.DragEvent<HTMLElement>>[];
    onDragEnter?: IGridCellEventCallback<T, React.DragEvent<HTMLElement>>[];
    onDragLeave?: IGridCellEventCallback<T, React.DragEvent<HTMLElement>>[];
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
        styleTemplate?: (row: T, column: IGridColumn<T>, cellLookup: ICellCoordinates) => React.CSSProperties;
        template?: IGridCellTemplate<T>;
        toolTip?: IGridCellTemplate<T>;
        append?: string | JSX.Element;
        prepend?: string | JSX.Element;
        default?: string;
        icon?: string;
        events?: IGridCellEvents<T>;
    };
    header?: {
        icon?: string | JSX.Element;
        tooltip?: string;
        caption?: string;
        events?: IGridHeaderEvents<T>;
        template?: IGridHeaderTemplate<T>;
    };
}
