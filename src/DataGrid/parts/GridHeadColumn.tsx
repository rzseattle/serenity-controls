import React, { useRef } from "react";
import { IGridColumn, IGridHeaderEvents } from "../interfaces/IGridColumn";
import { IGridHeaderEventCallback } from "../interfaces/IGridHeaderEventCallback";
import styles from "./GridHead.module.sass";
import { useGridContext } from "../config/GridContext";
import { IGridFilter } from "../interfaces/IGridFilter";
import { IFiltersChange } from "../interfaces/IFiltersChange";
import { Positioner, RelativePositionPresets } from "../../Positioner";
import { Modal } from "../../Modal";

const GridHeadColumn = <T,>({
    column,
    isOrderable,
    onOrderChange,
    filters,
    onFiltersChange,
    orderDir,
}: {
    column: IGridColumn<T>;
    isOrderable: boolean;
    orderDir: null | "asc" | "desc";
    onOrderChange: () => void;
    filters: IGridFilter[];
    onFiltersChange: IFiltersChange;
}) => {
    const config = useGridContext();
    const cellProperties: React.HTMLAttributes<HTMLDivElement> = {};
    const filterTrigger = useRef<HTMLDivElement>();

    if (column.header?.events) {
        Object.entries(column.header.events).map(([key, val]) => {
            const event = key as keyof IGridHeaderEvents<T>;
            cellProperties[event] = (event) => {
                val.forEach((callback: IGridHeaderEventCallback<T>) => {
                    callback({
                        column,
                        event,
                    });
                });
            };
        });
    }

    if (isOrderable) {
        const currOnClick = cellProperties["onClick"];
        cellProperties["onClick"] = (event) => {
            onOrderChange();
            if (currOnClick) {
                currOnClick(event);
            }
        };
    }

    let child;
    if (column.header?.template !== undefined) {
        child = column.header.template({
            column,
        });
    } else {
        child = (
            <div
                className={"w-grid-header-cell-in " + (cellProperties.onClick ? "w-grid-header-cell-in-clickable" : "")}
            >
                {column.header?.caption ?? column.field}
                {isOrderable && orderDir !== null && (
                    <div className={"w-grid-header-cell-in-order"}>{config.order.icons[orderDir]}</div>
                )}
                {filters.length > 0 && (
                    <>
                        <div
                            ref={filterTrigger}
                            className={"w-grid-header-cell-in-filter"}
                            onClick={(e) => {
                                e.stopPropagation();
                                onFiltersChange([
                                    ...filters.map((filter) => {
                                        filter.opened = !filter.opened;
                                        return filter;
                                    }),
                                ]);
                            }}
                        >
                            {config.filter.icons.filter}
                        </div>

                        {filters[0].opened && (
                            <Modal
                                relativeTo={() => filterTrigger.current}
                                relativeSettings={RelativePositionPresets.bottomRight}
                                show={true}
                                shadow={false}
                                className=""
                                onHide={() => {
                                    onFiltersChange([
                                        ...filters.map((filter) => {
                                            filter.opened = !filter.opened;
                                            return filter;
                                        }),
                                    ]);
                                }}
                            >
                                <div
                                    onClick={(e) => e.stopPropagation()}
                                    style={{
                                        padding: 20,
                                        backgroundColor: "#fafafa",
                                        border: "solid 1px #e6e6e6",
                                        borderRadius: 2,
                                        boxShadow:
                                            "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
                                    }}


                                >
                                    {filters.map((filter) => {
                                        const Component =
                                            filter.component ?? config.filter.components[filter.filterType];
                                        return (
                                            <>
                                                {Component ? (
                                                    <Component
                                                        key={filter.field + "" + filter.applyTo}
                                                        filter={filter}
                                                        hide={() => {
                                                            filter.opened = false;
                                                            onFiltersChange([filter]);
                                                        }}
                                                        onApply={(value) => {
                                                            filter.value = value;
                                                            onFiltersChange([filter]);
                                                        }}
                                                    />
                                                ) : (
                                                    "No filter found"
                                                )}
                                            </>
                                        );
                                    })}
                                </div>
                            </Modal>
                        )}
                    </>
                )}
            </div>
        );
    }
    return (
        <div className={styles.headerCell} {...cellProperties}>
            {child}
        </div>
    );
};

export default GridHeadColumn;
