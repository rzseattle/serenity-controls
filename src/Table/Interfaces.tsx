import * as React from "react";
import { IFilter } from "../filters/Intefaces";
import { TableRow } from "./TableRow";

export interface IColumnData {
    field?: string;
    caption?: string;
    isSortable?: boolean;
    display?: boolean;
    toolTip?: ICellTemplate;
    width?: number | string | null;
    class?: string[];
    type?: string;
    orderField?: string;
    icon?: string;
    append?: string | JSX.Element;
    prepend?: string | JSX.Element;
    classTemplate?: (row: any, column: IColumnData) => string[];
    styleTemplate?: (row: any, column: IColumnData) => any;
    rowSpan?: number | null;
    template?: ICellTemplate;
    default?: string;
    order?: string;
    header?: {
        icon?: string;
        tooltip?: string;
    };
    events?: {
        click?: IEventCallback[];
        headerClick?: IHeaderClickEvent[];
        mouseUp?: IEventCallback[];
        enter?: IEventCallback[];
        leave?: IEventCallback[];
    };
    filter?: IFilter[];
}

export type ICellTemplate = (
    value: string,
    row: any,
    column: IColumnData,
    rowComponent: TableRow,
) => string | JSX.Element;

export type IHeaderClickEvent = (column: IColumnData, event: any) => unknown;

export type IEventCallback = (
    row: any,
    column: IColumnData,
    rowComponent: TableRow,
    cell: HTMLElement,
    event: any,
) => any;

export interface IFilterValue {
    field: string;
    value: any;
    condition: string;
    caption: string;
    labelCaptionSeparator: string;
    label: string;
}

export interface IOrder {
    field: string;
    dir: string;
}
