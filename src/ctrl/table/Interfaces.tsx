import * as React from 'react'
import {IFilterComponent} from "../Filters"
import {IFilter} from '../filters/Intefaces';

export interface IColumnData {
    field?: string,
    caption?: string,
    isSortable?: boolean,
    display?: boolean,
    toolTip?: ICellTemplate,
    width?: number | string | null,
    class?: string[],
    type?: string,
    orderField?: string,
    icon?: string | JSX.Element,
    append?: string | JSX.Element,
    prepend?: string | JSX.Element,
    classTemplate?: { (row: any, column: IColumnData): Array<string> },
    styleTemplate?: { (row: any, column: IColumnData): any },
    template?: ICellTemplate,
    default?: string,
    order?: string
    header?: {
        icon?: string,
        tooltip?: string,
    }
    events?: {
        click?: Array<IEventCallback>,
        mouseUp?: Array<IEventCallback>,
        enter?: Array<IEventCallback>,
        leave?: Array<IEventCallback>
    },
    filter?: Array<IFilter>
}

export interface ICellTemplate {
    (value: string, row: any, column: IColumnData): string | JSX.Element
}

export interface IEventCallback {
    (row: any, column: IColumnData, event: React.MouseEvent<HTMLElement>): any
}




export interface IFilterValue {
    field: string
    value: any,
    condition: string,
    caption: string,
    labelCaptionSeparator: string,
    label: string
}

export interface IOrder {
    field: string;
    dir: string;
}
