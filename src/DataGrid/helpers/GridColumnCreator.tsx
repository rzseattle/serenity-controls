import { DateFilter, NumericFilter, SelectFilter, SwitchFilter, TextFilter } from "../../filters";
import { IOption } from "../../fields";
import { CommonIcons } from "../../lib/CommonIcons";
import { IGridCellTemplate } from "../interfaces/IGridCellTemplate";
import { IGridColumnData } from "../interfaces/IGridColumnData";
import GridColumnHelper from "./GridColumnHelper";
import React from "react";

export class GridColumnCreator<Row> {
    public number(field: Extract<keyof Row, number | string>, caption: string): GridColumnHelper<Row> {
        return new GridColumnHelper<Row>({
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

    public text<Row>(field: Extract<keyof Row, number | string>, caption: string): GridColumnHelper<Row> {
        return new GridColumnHelper<Row>({
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

    public map<Row>(
        field: Extract<keyof Row, number | string>,
        caption: string,
        options: IOption[] | { [index: string]: string | number } | { [index: number]: string | number },
        multiSelectFilter = false,
    ): GridColumnHelper<Row> {
        return new GridColumnHelper<Row>({
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

    public money<Row>(field: Extract<keyof Row, number | string>, caption: string): GridColumnHelper<Row> {
        return new GridColumnHelper<Row>({
            field,
            header: { caption },
            cell: {
                template: (row) => parseFloat(row[field] as unknown as string).toFixed(2),
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

    public email<Row>(field: Extract<keyof Row, number | string>, caption: string): GridColumnHelper<Row> {
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

    public date<Row>(field: Extract<keyof Row, number | string>, caption: string): GridColumnHelper<Row> {
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

    public bool<Row>(field: Extract<keyof Row, number | string>, caption: string): GridColumnHelper<Row> {
        return new GridColumnHelper({
            field,
            header: { caption },
            cell: {
                classTemplate: (row, column) => ["center", row[column.field] ? "darkgreen" : "darkred"],
                template: (row) => (row[field] ? <CommonIcons.check /> : <CommonIcons.close />),
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

    public hidden<Row>(field: Extract<keyof Row, number | string>): GridColumnHelper<Row> {
        return new GridColumnHelper({
            field,
            display: false,
        });
    }

    public template<Row>(template: IGridCellTemplate<Row>, caption = ""): GridColumnHelper<Row> {
        return new GridColumnHelper({
            header: { caption },
            cell: { template },
        }).noFilter();
    }

    public custom<T>(data: IGridColumnData<T>): GridColumnHelper<T> {
        return new GridColumnHelper<T>(data);
    }
}



// public editable<T>(
//     fn: (changedValue: any, row: any, column: IGridColumnData<T>) => boolean | string[],
//     type: "text" | "textarea" | "bool" | "switch" | "select",
//     enabled = true,
// //content?: IOption[],
// //valueGetter?: (row: any[]) => string,
// ): GridColumnHelper<T> {
//     if (enabled === false) {
//     return this;
// }
//
// //if (type === "switch" || type === "select") {
// alert("Not implemented: " + type);
// //}
//
// // const editableComponentsMap: {
// //     [index: string]: IEditableCell;
// // } = {
// //     text: EditableTextCell,
// //     boolean: EditableBooleanCell,
// // };
// //
// // this.className(["w-table-editable-cell"]);
//
// // const currTemplate = this.data.template;
// // this.data.template = (value, row, column, rowContainer) => {
// //     const columnsInEditState = rowContainer.getData("columnsInEdit", {});
// //     const isInEditState = columnsInEditState[column.field] === true;
// //
// //     if (isInEditState) {
// //         const Component = editableComponentsMap[type];
// //
// //         return (
// //             <div className="w-table-editable-cell-edited">
// //                 <Component
// //                     inputValue={valueGetter ? valueGetter(row) : value}
// //                     onSubmit={(value) => {
// //                         const result = fn(value, row, column);
// //                         if (result === true) {
// //                             const tmp = { ...columnsInEditState };
// //                             tmp[column.field] = false;
// //                             rowContainer.setData("columnsInEdit", tmp);
// //                         } else if (result === false) {
// //                             return false;
// //                         } else if (Array.isArray(result)) {
// //                             return result;
// //                         }
// //                     }}
// //                     onCancel={() => {
// //                         const tmp = { ...columnsInEditState };
// //                         tmp[column.field] = false;
// //                         rowContainer.setData("columnsInEdit", tmp);
// //                     }}
// //                 />
// //             </div>
// //         );
// //     } else {
// //         return (
// //             <div className="w-table-editable-cell-not-edited">
// //                 <div style={{ color: "lightgrey" }}>
// //                     <CommonIcons.edit />
// //                 </div>
// //                 <div>{currTemplate ? currTemplate(value, row, column, rowContainer) : value}</div>
// //             </div>
// //         );
// //     }
// // };
// // this.data.cell.events.click.push((row, column, rowContainer) => {
// //     const columnsInEditState = rowContainer.getData("columnsInEdit", {});
// //     if (columnsInEditState[column.field] === undefined || columnsInEditState[column.field] === false) {
// //         columnsInEditState[column.field] = true;
// //         rowContainer.setData("columnsInEdit", columnsInEditState);
// //     }
// // });
// return this;
// }

