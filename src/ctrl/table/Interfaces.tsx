import * as React from 'react'

export interface IColumnData {
    field: string,
    caption: string,
    isSortable: boolean,
    display: boolean,
    toolTip: ICellTemplate,
    width: number | string | null,
    class: Array<string>,
    type: string,
    orderField: string,
    icon: string | JSX.Element,
    append: string | JSX.Element,
    prepend: string | JSX.Element,
    classTemplate: () => Array<string>,
    styleTemplate: () => Array<string>,
    template: ICellTemplate,
    default: string,
    events: {
        click: Array<IEventCallback>,
        mouseUp: Array<IEventCallback>,
        enter: Array<IEventCallback>,
        leave: Array<IEventCallback>
    },
    filter: {
        type: string,
        field: string
    }
}

export interface ICellTemplate {
    (value: string, row: any, column: IColumnData): string | JSX.Element
}

export interface IEventCallback {
    (row: any, column: IColumnData, event: React.MouseEvent<HTMLElement> ): any
}