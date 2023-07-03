import { IGridCellEventCallback } from "./IGridCellEventCallback";
import { IGridCellTemplate } from "./IGridCellTemplate";
import { IGridHeaderEventCallback } from "./IGridHeaderEventCallback";
import { ICellCoordinates } from "./ICellCoordinates";
import { IGridHeaderTemplate } from "./IGridHeaderTemplate";
import React from "react";
import { Path } from "react-hook-form";

export interface IGridCellEvents<T = any> {
    onClick?: IGridCellEventCallback<T, React.MouseEvent<HTMLDivElement>>[];
    onMouseDown?: IGridCellEventCallback<T, React.MouseEvent<HTMLDivElement>>[];
    onMouseUp?: IGridCellEventCallback<T, React.MouseEvent<HTMLDivElement>>[];
    onMouseEnter?: IGridCellEventCallback<T, React.MouseEvent<HTMLDivElement>>[];
    onMouseOut?: IGridCellEventCallback<T, React.MouseEvent<HTMLDivElement>>[];
    onDoubleClick?: IGridCellEventCallback<T, React.MouseEvent<HTMLDivElement>>[];
    onDrag?: IGridCellEventCallback<T, React.DragEvent<HTMLDivElement>>[];
    onDrop?: IGridCellEventCallback<T, React.DragEvent<HTMLDivElement>>[];
    onDragStart?: IGridCellEventCallback<T, React.DragEvent<HTMLDivElement>>[];
    onDragOver?: IGridCellEventCallback<T, React.DragEvent<HTMLDivElement>>[];
    onDragEnter?: IGridCellEventCallback<T, React.DragEvent<HTMLDivElement>>[];
    onDragLeave?: IGridCellEventCallback<T, React.DragEvent<HTMLDivElement>>[];
    onMouseOver?: IGridCellEventCallback<T, React.DragEvent<HTMLDivElement>>[];

}

export interface IGridHeaderEvents<T> {
    onClick?: IGridHeaderEventCallback<T>[];
    onMouseUp?: IGridHeaderEventCallback<T>[];
    onMouseDown?: IGridHeaderEventCallback<T>[];
    onMouseEnter?: IGridHeaderEventCallback<T>[];
    onMouseOut?: IGridHeaderEventCallback<T>[];
    onDoubleClick?: IGridHeaderEventCallback<T>[];
}

export interface IGridColumn<T> {
    field?: Path<T> | number;
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
        classTemplate?: ({
            row,
            column,
            coordinates,
        }: {
            row: T;
            column: IGridColumn<T>;
            coordinates: ICellCoordinates;
        }) => string[];
        styleTemplate?: ({
            row,
            column,
            coordinates,
        }: {
            row: T;
            column: IGridColumn<T>;
            coordinates: ICellCoordinates;
        }) => React.CSSProperties;
        templates?: IGridCellTemplate<T>[];
        default?: string;
        events?: IGridCellEvents<T>;
    };
    header?: {
        icon?: string | JSX.Element;
        tooltip?: string | JSX.Element;
        caption?: string;
        events?: IGridHeaderEvents<T>;
        template?: IGridHeaderTemplate<T>;
    };
}
