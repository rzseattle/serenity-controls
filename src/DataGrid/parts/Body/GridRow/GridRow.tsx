import React from "react";
import { IGridCellEvents, IGridColumn } from "../../../interfaces/IGridColumn";
import { IGridCellEventCallback } from "../../../interfaces/IGridCellEventCallback";
import { IGridCellClassProvider } from "../../../interfaces/IGridCellClassProvider";
import { IGridCellStyleProvider } from "../../../interfaces/IGridCellStyleProvider";
import { get } from "react-hook-form";

export interface IRowProps<T> {
    row: T;
    columns: IGridColumn<T>[];
    rowProperties: React.HTMLAttributes<HTMLDivElement>;
    rowNumber: number;
    cellClassTemplate?: IGridCellClassProvider<T>;
    cellStyleTemplate?: IGridCellStyleProvider<T>;
}

const GridRow = <T,>({
    rowProperties,
    columns,
    rowNumber,
    row,
    cellClassTemplate,
    cellStyleTemplate,
}: IRowProps<T>) => {
    //const ref = useRef<HTMLDivElement>(null);
    return (
        <div {...rowProperties}>
            {columns.map((column, columnNumber) => {
                const coordinates = { row: rowNumber, column: columnNumber };
                const cellProperties: React.HTMLAttributes<HTMLDivElement> = {};

                if (columnNumber === 0) {
                    //cellProperties.draggable = true;
                    //     cellProperties["data-handler-id"] = handlerId;
                    //     cellProperties["ref"] = ref;
                }

                if (cellClassTemplate !== undefined && cellClassTemplate !== null) {
                    cellProperties.className = cellClassTemplate({ row, column, coordinates })?.join(" ");
                }

                if (cellStyleTemplate !== undefined && cellStyleTemplate !== null) {
                    cellProperties.style = cellStyleTemplate({ row, column, coordinates });
                }

                if (column.cell?.styleTemplate !== undefined) {
                    cellProperties.style = {
                        ...cellProperties?.style,
                        ...column.cell.styleTemplate({ row, column, coordinates }),
                    };
                }

                if (column.cell?.classTemplate !== undefined) {
                    cellProperties.className =
                        cellProperties.className ??
                        "" + " " + (column.cell.classTemplate({ row, column, coordinates }) ?? []).join(" ");
                }

                if (column.cell?.events !== undefined) {
                    if (column.cell.events.onDragStart) {
                        cellProperties.draggable = true;
                    }
                    Object.entries(column.cell.events).map(([key, val]) => {
                        const event = key as keyof IGridCellEvents<T>;
                        cellProperties[event] = (event) => {
                            val.forEach((callback: IGridCellEventCallback<T, any>) => {
                                callback({
                                    row,
                                    column,
                                    event,
                                    coordinates,
                                    // refresh: {
                                    //     cell: () => {
                                    //         //to implement
                                    //         setRefreshState((x) => x + 1);
                                    //     },
                                    //     row: () => {
                                    //         //to implement
                                    //         setRefreshState((x) => x + 1);
                                    //     },
                                    //     grid: () => {
                                    //         //to implement
                                    //         setRefreshState((x) => x + 1);
                                    //     },
                                    // },
                                });
                            });
                        };
                    });
                }
                let child;
                if (column.cell?.template !== undefined) {
                    child = column.cell.template({
                        row,
                        column,
                        coordinates,
                    });
                } else {
                    if (typeof column.field === "string") {
                        child = get(row, column.field);
                    } else {
                        //todo sprawdzic ts
                        // @ts-ignore
                        child = row[column.field];
                    }
                }

                return (
                    <div key={column.field + column.name ?? ""} {...cellProperties}>
                        {child}
                    </div>
                );
            })}
        </div>
    );
};

export default GridRow;
