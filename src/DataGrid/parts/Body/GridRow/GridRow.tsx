import React from "react";
import { IGridCellEvents, IGridColumn } from "../../../interfaces/IGridColumn";
import { IGridCellEventCallback } from "../../../interfaces/IGridCellEventCallback";
import { IGridCellClassProvider } from "../../../interfaces/IGridCellClassProvider";
import { IGridCellStyleProvider } from "../../../interfaces/IGridCellStyleProvider";
import { get } from "react-hook-form";
import { IGridController } from "../../../interfaces/IGridController";

export interface IRowProps<T> {
    row: T;
    columns: IGridColumn<T>[];
    rowProperties: React.HTMLAttributes<HTMLDivElement>;
    rowNumber: number;
    cellClassTemplate?: IGridCellClassProvider<T>;
    cellStyleTemplate?: IGridCellStyleProvider<T>;
    controller?: IGridController;
}

const GridRow = <T,>({
    rowProperties,
    columns,
    rowNumber,
    row,
    cellClassTemplate,
    cellStyleTemplate,
    controller,
}: IRowProps<T>) => {
    //const ref = useRef<HTMLDivElement>(null);

    return (
        <div {...rowProperties}>
            {columns.map((column, columnNumber) => {
                column.cell = column.cell ?? {};
                column.cell.events = column.cell.events ?? {};

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

                if (column.cell.styleTemplate !== undefined) {
                    cellProperties.style = {
                        ...cellProperties?.style,
                        ...column.cell.styleTemplate({ row, column, coordinates }),
                    };
                }

                if (column.cell.classTemplate !== undefined) {
                    cellProperties.className =
                        cellProperties.className ??
                        "" + " " + (column.cell.classTemplate({ row, column, coordinates }) ?? []).join(" ");
                }

                if (column.cell.class !== undefined) {
                    cellProperties.className = cellProperties.className ?? "" + " " + column.cell?.class.join(" ");
                }

                let child;
                const currentCellEvents: IGridCellEvents<T> = {};
                if (column.cell?.templates !== undefined && column.cell?.templates.length > 0) {
                    child = column.cell.templates.reduce((prev: null | string | React.ReactNode, template) => {
                        const returned = template({
                            row,
                            column,
                            coordinates,
                            prevValue: prev,
                            controller,
                        });
                        if (typeof returned == "object" && "content" in returned) {
                            Object.entries(returned.cellEvents).map(
                                ([key, val]: [keyof IGridCellEvents<T>, IGridCellEventCallback<T, any>[]]) => {
                                    currentCellEvents[key] = [...(currentCellEvents[key] ?? []), ...val];
                                },
                            );
                            return returned.content;
                        }

                        return returned;
                    }, null);
                } else {
                    if (typeof column.field === "string") {
                        child = get(row, column.field);
                    } else {
                        //todo sprawdzic ts
                        // @ts-ignore
                        child = row[column.field];
                    }
                }

                if (column.cell?.events !== undefined) {
                    Object.entries(column.cell.events).map(
                        ([key, val]: [keyof IGridCellEvents<T>, IGridCellEventCallback<T, any>[]]) => {
                            currentCellEvents[key] = [...(currentCellEvents[key] ?? []), ...val];
                        },
                    );
                }

                if (currentCellEvents.onDragStart) {
                    cellProperties.draggable = true;
                }
                Object.entries(currentCellEvents).map(([key, val]) => {
                    const event = key as keyof IGridCellEvents<T>;

                    cellProperties[event] = (event) => {
                        val.forEach((callback: IGridCellEventCallback<T, any>) => {
                            event.persist();
                            callback({
                                row,
                                column,
                                event,
                                coordinates,
                                controller,
                            });
                        });
                    };
                });

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
