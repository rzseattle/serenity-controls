import * as React from "react";
import { DateFilter, IFilter, NumericFilter, SelectFilter, SwitchFilter, TextFilter } from "../../filters";
import { IGridColumnData } from "../interfaces/IGridColumnData";
import { IOption } from "../../fields";
import { IGridCellTemplate } from "../interfaces/IGridCellTemplate";
import { CommonIcons } from "../../lib/CommonIcons";
import { IGridCellEventCallback } from "../interfaces/IGridCellEventCallback";
import { IGridHeaderEventCallback } from "../interfaces/IGridHeaderEventCallback";


export class GridColumnHelperG<T>{
    public number(field: string, caption: string): GridColumnHelper<T> {
        return GridColumnHelper.number<T>(field, caption);
    }
}

class GridColumnHelper<T> {
    protected data: IGridColumnData<T>;

    constructor(initData: Partial<IGridColumnData<T>>) {
        this.data = {
            ...initData,
        };
    }

    public static number<T>(field: string, caption: string): GridColumnHelper<T> {
        return new GridColumnHelper({
            field,
            header: { caption },

            filter: [
                {
                    caption,
                    field,
                    component: NumericFilter,
                    config: {
                        showFilterOptions: true,
                    },
                },
            ],
        }).className(["right"]);
    }

    public static map<T>(
        field: string,
        caption: string,
        options: IOption[] | { [index: string]: string | number } | { [index: number]: string | number },
        multiSelectFilter = false,
    ): GridColumnHelper<T> {
        return new GridColumnHelper<T>({
            field,
            header: { caption },
            cell: {
                template: (row) => {
                    const value = row[field] as unknown;
                    if (Array.isArray(options)) {
                        const res = options.filter((e) => e.value == value);
                        if (res.length > 0) {
                            return res[0].label;
                        }
                        return "---";
                    } else {
                        // @ts-ignore
                        return options && options[value];
                    }
                },
            },
            filter: [
                {
                    field,
                    component: SelectFilter,
                    config: {
                        content: options,
                        multiselect: multiSelectFilter,
                        mode: "list",
                        applyOnChange: true,
                    },
                },
            ],
        });
    }

    public static text<T>(field: string, caption: string): GridColumnHelper<T> {
        return new GridColumnHelper({
            field,
            header: { caption },
            filter: [
                {
                    caption,
                    // label: caption,
                    field,
                    component: TextFilter,
                    config: {
                        showFilterOptions: true,
                    },
                },
            ],
        });
    }

    public static money<T>(field: string, caption: string): GridColumnHelper<T> {
        return new GridColumnHelper({
            field,
            header: { caption },
            cell: {
                template: (row) => parseFloat(row[field]).toFixed(2),
            },
            filter: [
                {
                    field,
                    caption,
                    component: NumericFilter,
                    config: {
                        showFilterOptions: true,
                    },
                },
            ],
        }).className(["right"]);
    }

    public static email<T>(field: string, caption: string): GridColumnHelper<T> {
        return new GridColumnHelper({
            field,
            header: { caption },

            cell: {
                template: (row) => <a href={"mailto:" + row[field]}>{row[field]}</a>,
            },
            filter: [
                {
                    field,
                    caption,
                    component: TextFilter,
                    config: {
                        showFilterOptions: true,
                    },
                },
            ],
        });
    }

    public static date<T>(field: string, caption: string): GridColumnHelper<T> {
        return new GridColumnHelper({
            field,
            header: { caption },

            filter: [
                {
                    field,
                    component: DateFilter,
                },
            ],
        });
    }

    public static bool<T>(field: string, caption: string): GridColumnHelper<T> {
        return new GridColumnHelper({
            field,
            header: { caption },
            cell: {
                classTemplate: (row, column) => ["center", row[column.field] == "1" ? "darkgreen" : "darkred"],
                template: (row) => (row[field] == "1" ? <CommonIcons.check /> : <CommonIcons.close />),
            },
            filter: [
                {
                    field,
                    component: SwitchFilter,
                    config: {
                        content: [
                            { value: 0, label: "Nie" },
                            { value: 1, label: "Tak" },
                        ],
                    },
                },
            ],
        });
    }

    public static hidden<T>(field: string): GridColumnHelper<T> {
        return new GridColumnHelper({
            field,
            display: false,
        });
    }

    public static template<T>(template: IGridCellTemplate<T>, caption = ""): GridColumnHelper<T> {
        return new GridColumnHelper({
            header: { caption },
            cell: { template },
        }).noFilter();
    }

    public static custom<T>(data: IGridColumnData<T>): GridColumnHelper<T> {
        return new GridColumnHelper<T>(data);
    }

    public editable<T>(
        fn: (changedValue: any, row: any, column: IGridColumnData<T>) => boolean | string[],
        type: "text" | "textarea" | "bool" | "switch" | "select",
        enabled = true,
        //content?: IOption[],
        //valueGetter?: (row: any[]) => string,
    ): GridColumnHelper<T> {
        if (enabled === false) {
            return this;
        }

        //if (type === "switch" || type === "select") {
        alert("Not implemented: " + type);
        //}

        // const editableComponentsMap: {
        //     [index: string]: IEditableCell;
        // } = {
        //     text: EditableTextCell,
        //     boolean: EditableBooleanCell,
        // };
        //
        // this.className(["w-table-editable-cell"]);

        // const currTemplate = this.data.template;
        // this.data.template = (value, row, column, rowContainer) => {
        //     const columnsInEditState = rowContainer.getData("columnsInEdit", {});
        //     const isInEditState = columnsInEditState[column.field] === true;
        //
        //     if (isInEditState) {
        //         const Component = editableComponentsMap[type];
        //
        //         return (
        //             <div className="w-table-editable-cell-edited">
        //                 <Component
        //                     inputValue={valueGetter ? valueGetter(row) : value}
        //                     onSubmit={(value) => {
        //                         const result = fn(value, row, column);
        //                         if (result === true) {
        //                             const tmp = { ...columnsInEditState };
        //                             tmp[column.field] = false;
        //                             rowContainer.setData("columnsInEdit", tmp);
        //                         } else if (result === false) {
        //                             return false;
        //                         } else if (Array.isArray(result)) {
        //                             return result;
        //                         }
        //                     }}
        //                     onCancel={() => {
        //                         const tmp = { ...columnsInEditState };
        //                         tmp[column.field] = false;
        //                         rowContainer.setData("columnsInEdit", tmp);
        //                     }}
        //                 />
        //             </div>
        //         );
        //     } else {
        //         return (
        //             <div className="w-table-editable-cell-not-edited">
        //                 <div style={{ color: "lightgrey" }}>
        //                     <CommonIcons.edit />
        //                 </div>
        //                 <div>{currTemplate ? currTemplate(value, row, column, rowContainer) : value}</div>
        //             </div>
        //         );
        //     }
        // };
        // this.data.cell.events.click.push((row, column, rowContainer) => {
        //     const columnsInEditState = rowContainer.getData("columnsInEdit", {});
        //     if (columnsInEditState[column.field] === undefined || columnsInEditState[column.field] === false) {
        //         columnsInEditState[column.field] = true;
        //         rowContainer.setData("columnsInEdit", columnsInEditState);
        //     }
        // });
        return this;
    }

    public className(className: string[]): GridColumnHelper<T> {
        this.data.cell.class = className;
        return this;
    }

    public onHeaderClick<T>(fn: IGridHeaderEventCallback<T>): GridColumnHelper<T> {
        this.data.header.events.click.push(fn);
        return this;
    }

    public template<T>(fn: IGridCellTemplate<T>): GridColumnHelper<T> {
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

    public onClick<T>(fn: IGridCellEventCallback<T>): GridColumnHelper<T> {
        this.createEventsStruct("click");
        this.data.cell.events.click.push(fn);

        return this;
    }

    public onMouseUp<T>(fn: IGridCellEventCallback<T>): GridColumnHelper<T> {
        this.createEventsStruct("mouseUp");
        this.data.cell.events.mouseUp.push(fn);
        return this;
    }

    public onEnter<T>(fn: IGridCellEventCallback<T>): GridColumnHelper<T> {
        this.createEventsStruct("enter");
        this.data.cell.events.enter.push(fn);
        return this;
    }

    public onLeave<T>(fn: IGridCellEventCallback<T>): GridColumnHelper<T> {
        this.createEventsStruct("leave");
        this.data.cell.events.leave.push(fn);
        return this;
    }

    public styleTemplate<T>(fn: (row: T, column: IGridColumnData<T>) => React.CSSProperties) {
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
export { GridColumnHelper, GridColumnHelper<T> as Column };
