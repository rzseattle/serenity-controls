import { IGridCellEvents, IGridColumn, IGridHeaderEvents } from "../../interfaces/IGridColumn";
import { IGridFilter } from "../../interfaces/IGridFilter";
import { IGridOrder } from "../../interfaces/IGridOrder";
import { IGridCellTemplate } from "../../interfaces/IGridCellTemplate";

import { IGridHeaderTemplate } from "../../interfaces/IGridHeaderTemplate";
import { IGridCellClassProvider } from "../../interfaces/IGridCellClassProvider";
import { IGridCellStyleProvider } from "../../interfaces/IGridCellStyleProvider";

//needed to extract type of event from array like Type[]
type ArrayElement<ArrayType extends readonly unknown[]> = ArrayType extends readonly (infer ElementType)[]
    ? ElementType
    : never;

export class ColumnTemplate<Row> {
    column: IGridColumn<Row> = {};
    filters: IGridFilter[] = null;
    order: IGridOrder[] = [];
    parent: ColumnTemplate<Row>;

    dataChangeListeners: Array<(data: Row) => any> = [];

    constructor() {
        this.parent = this;
    }

    public header = {
        on: <K extends keyof IGridHeaderEvents<Row>>(event: K, callback: ArrayElement<IGridHeaderEvents<Row>[K]>) => {
            this.column.header = this.column.header ?? {};
            this.column.header.events = this.column.header.events ?? {};
            this.column.header.events[event] = this.column.header.events[event] ?? [];
            this.column.header.events[event].push(callback);
            return this.parent;
        },
        template: (callback: IGridHeaderTemplate<Row>): ColumnTemplate<Row> => {
            this.column.header = this.column.header ?? {};
            this.column.header.template = callback;
            return this.parent;
        },
        tooltip: (tooltip: string | JSX.Element) => {
            this.column.header = this.column.header ?? {};
            this.column.header.tooltip = tooltip;
            return this.parent;
        },
        icon: (icon: string | JSX.Element) => {
            this.column.header = this.column.header ?? {};
            this.column.header.icon = icon;
            return this.parent;
        },
        caption: (caption: string) => {
            this.column.header = this.column.header ?? {};
            this.column.header.caption = caption;
            return this.parent;
        },
    };
    on = <K extends keyof IGridCellEvents<Row>>(event: K, callback: ArrayElement<IGridCellEvents<Row>[K]>) => {
        this.column.cell = this.column.cell ?? {};
        this.column.cell.events = this.column.cell.events ?? {};
        this.column.cell.events[event] = this.column.cell.events[event] ?? [];
        this.column.cell.events[event].push(callback);
        return this;
    };

    public className = (names: string[]) => {
        this.column.cell = this.column.cell ?? {};
        this.column.cell.class = names;
        this.parent = this;
        return this;
    };

    /**
     * @deprecated ( use add template )
     * @param fn
     */
    public template(fn: IGridCellTemplate<Row>) {
        return this.addTemplate(fn);
    }

    public addTemplate(fn: IGridCellTemplate<Row>) {
        this.column.cell = this.column.cell ?? {};
        this.column.cell.templates = this.column.cell.templates ?? [];
        this.column.cell.templates.push(fn);
        return this;
    }

    public width(x: number | string | "min-content" | "max-content" | "auto"): ColumnTemplate<Row> {
        this.column.width = x;
        return this;
    }

    public rowSpan(span: number) {
        this.column.rowSpan = span;
        return this;
    }

    public addFilter(filter: IGridFilter | false) {
        if (filter !== false) {
            this.filters.push({ caption: this.column.header.caption, ...filter, applyTo: this.column.name });
        }
        return this;
    }

    public noFilter() {
        this.filters = [];
        return this;
    }

    public noSorter() {
        this.order = [];
        return this;
    }

    public styleTemplate(fn: IGridCellStyleProvider<Row>) {
        this.column.cell = this.column.cell ?? {};
        this.column.cell.styleTemplate = fn;
        return this;
    }

    public classTemplate(fn: IGridCellClassProvider<Row>) {
        this.column.cell = this.column.cell ?? {};
        this.column.cell.classTemplate = fn;
        return this;
    }

    public default(value: string | number) {
        this.column.cell = this.column.cell ?? {};
        this.column.cell.default = value as string;
        return this;
    }

    public set(el: Partial<IGridColumn<Row>>) {
        this.column = { ...this.column, ...el };
        return this;
    }

    public get = () => {
        return { column: this.column, filters: this.filters, sort: this.order };
    };

    protected onGridDataChange(callback: (data: Row) => any) {
        this.dataChangeListeners.push(callback);
    }

    public runDataChanged() {}
}
