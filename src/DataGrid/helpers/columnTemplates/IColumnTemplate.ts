import { IGridColumn } from "../../interfaces/IGridColumn";
import { IGridFilter } from "../../interfaces/IGridFilter";
import { IGridOrder } from "../../interfaces/IGridOrder";
import { IGridHeaderEventCallback } from "../../interfaces/IGridHeaderEventCallback";
import { IGridCellTemplate } from "../../interfaces/IGridCellTemplate";
import { IFilter } from "../../../filters";
import { IGridCellEventCallback } from "../../interfaces/IGridCellEventCallback";
import * as React from "react";

export interface IColumnTemplate<Row> {
    column: IGridColumn<Row>;
    filters: IGridFilter[];
    sort: IGridOrder;

    className: (names: string[]) => IColumnTemplate<Row>;
    onHeaderClick: (fn: IGridHeaderEventCallback<Row>) => IColumnTemplate<Row>;
    template: (fn: IGridCellTemplate<Row>) => IColumnTemplate<Row>;
    append: (x: any) => IColumnTemplate<Row>;
    prepend: (x: any) => IColumnTemplate<Row>;
    width: (x: any) => IColumnTemplate<Row>;
    rowSpan: (span: number) => IColumnTemplate<Row>;
    headerTooltip: (text: string) => IColumnTemplate<Row>;
    caption: (caption: string) => IColumnTemplate<Row>;
    headerIcon: (iconName: string) => IColumnTemplate<Row>;
    addFilter: (filter: IFilter | false) => IColumnTemplate<Row>;
    noFilter: () => IColumnTemplate<Row>;
    noSorter: () => IColumnTemplate<Row>;

    onClick: (fn: IGridCellEventCallback<Row>) => IColumnTemplate<Row>;
    onMouseUp: (fn: IGridCellEventCallback<Row>) => IColumnTemplate<Row>;
    onEnter: (fn: IGridCellEventCallback<Row>) => IColumnTemplate<Row>;
    onLeave: (fn: IGridCellEventCallback<Row>) => IColumnTemplate<Row>;
    styleTemplate: (fn: (row: Row, column: IGridColumn<Row>) => React.CSSProperties) => IColumnTemplate<Row>;
    classTemplate: (fn: (row: Row, column: IGridColumn<Row>) => string[]) => IColumnTemplate<Row>;
    set: (el: Partial<IGridColumn<Row>>) => IColumnTemplate<Row>;

    get: () => {
        column: IGridColumn<Row>;
        filters: IGridFilter[];
        sort: IGridOrder;
    };
}
