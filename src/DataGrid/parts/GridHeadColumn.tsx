import React, { useRef, useState } from "react";
import { IGridColumn, IGridHeaderEvents } from "../interfaces/IGridColumn";
import { IGridHeaderEventCallback } from "../interfaces/IGridHeaderEventCallback";
import { useGridContext } from "../config/GridContext";
import { IGridFilter } from "../interfaces/IGridFilter";
import { IFiltersChange } from "../interfaces/IFiltersChange";
import { RelativePositionPresets } from "../../Positioner";
import { Modal } from "../../Modal";
import GridFiltersPanel from "./GridFiltersPanel";
import styles from "./GridHeadColumn.module.sass";

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
    const [filtersVisible, setFiltersVisible] = useState(false);
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
                className={
                    styles.gridHeaderCellIn +
                    " " +
                    (cellProperties.onClick ? styles.gridHeaderCellInClickable + " " : "") +
                    (filtersVisible ? styles.gridHeaderCellInFilterOn : "")
                }
                ref={filterTrigger}
            >
                {column.header?.caption ?? column.field}
                {isOrderable && orderDir !== null && (
                    <div className={styles.gridHeaderCellInOrder}>{config.order.icons[orderDir]}</div>
                )}
                {filters.length > 0 && (
                    <>
                        <div
                            className={styles.gridHeaderCellInFilter}
                            onClick={(e) => {
                                e.stopPropagation();
                                setFiltersVisible(true);
                            }}
                        >
                            {config.filter.icons.filter}
                        </div>

                        {filtersVisible && (
                            <Modal
                                relativeTo={() => filterTrigger.current}
                                relativeSettings={RelativePositionPresets.bottomLeft}
                                show={true}
                                shadow={false}
                                className=""
                                onHide={() => {
                                    setFiltersVisible(false);
                                }}

                            >
                                <div
                                    onClick={(e) => e.stopPropagation()}
                                    className={styles.filtersPanelContainer}
                                    style={{}}
                                >
                                    <GridFiltersPanel
                                        onFiltersChange={(filters) => {
                                            setFiltersVisible(false);
                                            onFiltersChange(filters);
                                        }}
                                        filters={filters}
                                    />
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
