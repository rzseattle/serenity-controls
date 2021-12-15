import { IGridColumn } from "../../interfaces/IGridColumn";
import { IGridFilter } from "../../interfaces/IGridFilter";
import { IGridSorter } from "../../interfaces/IGridSorter";
import { IGridHeaderEventCallback } from "../../interfaces/IGridHeaderEventCallback";
import { IGridCellTemplate } from "../../interfaces/IGridCellTemplate";
import { IFilter } from "../../../filters";
import { IGridCellEventCallback } from "../../interfaces/IGridCellEventCallback";
import * as React from "react";

export abstract class ColumnTemplate<Row> {
    protected column: IGridColumn<Row> = {};
    protected filters: IGridFilter[] = null;
    protected sort: IGridSorter = null;

/*    constructor(initData: Partial<IGridColumn<Row>>) {
        this.column = {
            ...initData,
        };
    }*/

    public className(className: string[]): ColumnTemplate<Row> {
        this.column.cell = this.column.cell ?? {};
        this.column.cell.class = className;
        return this;
    }

    public onHeaderClick(fn: IGridHeaderEventCallback<Row>): ColumnTemplate<Row> {
        this.column.header.events.click.push(fn);
        return this;
    }

    public template(fn: IGridCellTemplate<Row>): ColumnTemplate<Row> {
        this.column.cell = this.column.cell ?? {};
        this.column.cell.template = fn;
        return this;
    }

    public append(x: any): ColumnTemplate<Row> {
        this.column.cell.append = x;
        return this;
    }

    public prepend(x: any): ColumnTemplate<Row> {
        this.column.cell.prepend = x;
        return this;
    }

    public width(x: any): ColumnTemplate<Row> {
        this.column.width = x;
        return this;
    }

    public rowSpan(span: number) {
        this.column.rowSpan = span;
        return this;
    }

    public headerTooltip(text: string): ColumnTemplate<Row> {
        this.column.header.tooltip = text;
        return this;
    }

    public caption = (caption: string): ColumnTemplate<Row> => {
        this.column.header.caption = caption;
        return this;
    };

    public headerIcon(iconName: string): ColumnTemplate<Row> {
        this.column.header.icon = iconName;
        this.column.filter[0].caption = "xx";
        return this;
    }

    public addFilter(filter: IFilter | false) {
        if (filter !== false) {
            this.column.filter.push(filter);
        }
        return this;
    }

    /*    public setSortField(field: string){
            this.column.sortField = field;
            this.column.isSortable = true;
            return this;
        }*/

    public noFilter(): ColumnTemplate<Row> {
        this.column.filter = [];
        return this;
    }

    public noSorter(): ColumnTemplate<Row> {
        this.column.isSortable = false;
        return this;
    }

    /*filter(type, field, conf) {
        if(Array.isArray(this.column.filter)){

        }else{

        }
    }*/

    private createEventsStruct = (type: "click" | "mouseUp" | "enter" | "leave") => {
        this.column.cell = this.column.cell ?? {};
        this.column.cell.events = this.column.cell.events ?? {};
        this.column.cell.events[type] = this.column.cell.events.click ?? [];
    };

    public onClick(fn: IGridCellEventCallback<Row>): ColumnTemplate<Row> {
        this.createEventsStruct("click");
        this.column.cell.events.click.push(fn);

        return this;
    }

    public onMouseUp(fn: IGridCellEventCallback<Row>): ColumnTemplate<Row> {
        this.createEventsStruct("mouseUp");
        this.column.cell.events.mouseUp.push(fn);
        return this;
    }

    public onEnter(fn: IGridCellEventCallback<Row>): ColumnTemplate<Row> {
        this.createEventsStruct("enter");
        this.column.cell.events.enter.push(fn);
        return this;
    }

    public onLeave(fn: IGridCellEventCallback<Row>): ColumnTemplate<Row> {
        this.createEventsStruct("leave");
        this.column.cell.events.leave.push(fn);
        return this;
    }

    public styleTemplate(fn: (row: Row, column: IGridColumn<Row>) => React.CSSProperties) {
        this.column.cell = this.column.cell ?? {};
        this.column.cell.styleTemplate = fn;
        return this;
    }

    public classTemplate(fn: (row: any, column: IGridColumn<Row>) => string[]) {
        this.column.cell = this.column.cell ?? {};
        this.column.cell.classTemplate = fn;
        return this;
    }

    public default(value: string | number) {
        this.column.cell = this.column.cell ?? {};
        this.column.cell.default = value as string;
        return this;
    }

    public set(el: Partial<IGridColumn<Row>>): ColumnTemplate<Row> {
        this.column = { ...this.column, ...el };
        return this;
    }

    public get = () => {
        return { column: this.column, filters: this.filters, sort: this.sort };
    };
}
