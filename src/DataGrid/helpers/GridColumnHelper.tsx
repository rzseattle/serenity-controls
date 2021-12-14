import * as React from "react";
import { IFilter } from "../../filters";
import { IGridColumnData } from "../interfaces/IGridColumnData";
import { IGridCellTemplate } from "../interfaces/IGridCellTemplate";
import { IGridCellEventCallback } from "../interfaces/IGridCellEventCallback";
import { IGridHeaderEventCallback } from "../interfaces/IGridHeaderEventCallback";

class GridColumnHelper<T> {
    protected data: IGridColumnData<T>;

    constructor(initData: Partial<IGridColumnData<T>>) {
        this.data = {
            ...initData,
        };
    }

    public className(className: string[]): GridColumnHelper<T> {
        this.data.cell = this.data.cell ?? {};
        this.data.cell.class = className;
        return this;
    }

    public onHeaderClick(fn: IGridHeaderEventCallback<T>): GridColumnHelper<T> {
        this.data.header.events.click.push(fn);
        return this;
    }

    public template(fn: IGridCellTemplate<T>): GridColumnHelper<T> {
        this.data.cell = this.data.cell ?? {};
        this.data.cell.template = fn;
        return this;
    }

    public append(x: any): GridColumnHelper<T> {
        this.data.cell.append = x;
        return this;
    }

    public prepend(x: any): GridColumnHelper<T> {
        this.data.cell.prepend = x;
        return this;
    }

    public width(x: any): GridColumnHelper<T> {
        this.data.width = x;
        return this;
    }

    public rowSpan(span: number) {
        this.data.rowSpan = span;
        return this;
    }

    public headerTooltip(text: string): GridColumnHelper<T> {
        this.data.header.tooltip = text;
        return this;
    }

    public caption = (caption: string): GridColumnHelper<T> => {
        this.data.header.caption = caption;
        return this;
    };

    public headerIcon(iconName: string): GridColumnHelper<T> {
        this.data.header.icon = iconName;
        this.data.filter[0].caption = "xx";
        return this;
    }

    public addFilter(filter: IFilter | false) {
        if (filter !== false) {
            this.data.filter.push(filter);
        }
        return this;
    }

    /*    public setSortField(field: string){
            this.data.sortField = field;
            this.data.isSortable = true;
            return this;
        }*/

    public noFilter(): GridColumnHelper<T> {
        this.data.filter = [];
        return this;
    }

    public noSorter(): GridColumnHelper<T> {
        this.data.isSortable = false;
        return this;
    }

    /*filter(type, field, conf) {
        if(Array.isArray(this.data.filter)){

        }else{

        }
    }*/

    private createEventsStruct = (type: "click" | "mouseUp" | "enter" | "leave") => {
        this.data.cell = this.data.cell ?? {};
        this.data.cell.events = this.data.cell.events ?? {};
        this.data.cell.events[type] = this.data.cell.events.click ?? [];
    };

    public onClick(fn: IGridCellEventCallback<T>): GridColumnHelper<T> {
        this.createEventsStruct("click");
        this.data.cell.events.click.push(fn);

        return this;
    }

    public onMouseUp(fn: IGridCellEventCallback<T>): GridColumnHelper<T> {
        this.createEventsStruct("mouseUp");
        this.data.cell.events.mouseUp.push(fn);
        return this;
    }

    public onEnter(fn: IGridCellEventCallback<T>): GridColumnHelper<T> {
        this.createEventsStruct("enter");
        this.data.cell.events.enter.push(fn);
        return this;
    }

    public onLeave(fn: IGridCellEventCallback<T>): GridColumnHelper<T> {
        this.createEventsStruct("leave");
        this.data.cell.events.leave.push(fn);
        return this;
    }

    public styleTemplate(fn: (row: T, column: IGridColumnData<T>) => React.CSSProperties) {
        this.data.cell = this.data.cell ?? {};
        this.data.cell.styleTemplate = fn;
        return this;
    }

    public classTemplate(fn: (row: any, column: IGridColumnData<T>) => string[]) {
        this.data.cell = this.data.cell ?? {};
        this.data.cell.classTemplate = fn;
        return this;
    }

    public default(value: string | number) {
        this.data.cell = this.data.cell ?? {};
        this.data.cell.default = value as string;
        return this;
    }

    public set(el: Partial<IGridColumnData<T>>): GridColumnHelper<T> {
        this.data = { ...this.data, ...el };
        return this;
    }

    public get(): IGridColumnData<T> {
        return this.data;
    }
}

export default GridColumnHelper;
export { GridColumnHelper };
