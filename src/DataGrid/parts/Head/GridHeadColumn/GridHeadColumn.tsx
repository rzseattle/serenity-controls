import React, { useRef, useState } from "react";
import { IGridColumn, IGridHeaderEvents } from "../../../interfaces/IGridColumn";
import { IGridHeaderEventCallback } from "../../../interfaces/IGridHeaderEventCallback";
import { useGridContext } from "../../../config/GridContext";
import { IGridFilter } from "../../../interfaces/IGridFilter";
import { IFiltersChange } from "../../../interfaces/IFiltersChange";
import styles from "./GridHeadColumn.module.sass";
import { IGridOrderDirections } from "../../../interfaces/IGridOrder";
import GridFiltersModal from "../../Addons/GridFiltersModal/GridFiltersModal";
import { IGridController } from "../../../interfaces/IGridController";

const GridHeadColumn = <T,>({
    column,
    isOrderable,
    onOrderChange,
    filters,
    onFiltersChange,
    orderDir,
    controller,
}: {
    column: IGridColumn<T>;
    isOrderable: boolean;
    orderDir: IGridOrderDirections;
    onOrderChange: (newDir: IGridOrderDirections) => void;
    filters: IGridFilter[];
    onFiltersChange: IFiltersChange;
    controller?: IGridController;
}) => {
    const config = useGridContext();
    const cellProperties: React.HTMLAttributes<HTMLDivElement> = {};
    const [filtersVisible, setFiltersVisible] = useState(false);
    const filterTrigger = useRef<HTMLDivElement>();

    if (column.header?.events) {
        Object.entries(column.header?.events).map(([key, val]) => {
            const event = key as keyof IGridHeaderEvents<T>;
            cellProperties[event] = (event) => {
                val.forEach((callback: IGridHeaderEventCallback<T>) => {
                    callback({
                        column,
                        event,
                        controller,
                    });
                });
            };
        });
    }

    if (isOrderable) {
        const currOnClick = cellProperties["onClick"];
        cellProperties["onClick"] = (event) => {
            let newDir: IGridOrderDirections = undefined;
            if (orderDir === undefined) {
                newDir = "asc";
            } else if (orderDir === "asc") {
                newDir = "desc";
            }

            onOrderChange(newDir);
            if (currOnClick) {
                currOnClick(event);
            }
        };
    }

    let child;
    if (column.header?.template !== undefined) {
        child = column.header?.template({
            column,
            defaultClassName: styles.gridHeaderCellIn,
            triggerFiltersShow: () => {
                setFiltersVisible(true);
            },
        });
    } else {
        child = (
            <div
                className={
                    styles.gridHeaderCellIn +
                    " " +
                    (cellProperties.onClick || isOrderable ? styles.gridHeaderCellInClickable + " " : "") +
                    (filtersVisible ? styles.gridHeaderCellInFilterOn : "")
                }
                ref={filterTrigger}
            >
                {isOrderable && orderDir !== null && (
                    <div className={styles.gridHeaderCellInOrder}>{config.order.icons[orderDir]}</div>
                )}
                <div className={styles.title}>
                    {column.header?.icon && column.header?.icon}
                    {column.header?.caption ?? column.field}
                </div>

                {filters?.length > 0 && (
                    <div
                        className={styles.gridHeaderCellInFilter}
                        data-testid={"grid-head-filter-trigger"}
                        onClick={(e) => {
                            e.stopPropagation();
                            setFiltersVisible(true);
                        }}
                    >
                        {config.filter.icons.filter}
                    </div>
                )}
            </div>
        );
    }
    return (
        <>
            <div ref={filterTrigger} {...cellProperties} data-testid={"grid-column"}>
                {child}
            </div>
            {filtersVisible && (
                <GridFiltersModal
                    relativeTo={filterTrigger.current}
                    onHide={() => setFiltersVisible(false)}
                    onFiltersChange={onFiltersChange}
                    editedFilter={filters}
                    filters={filters}
                />
            )}
        </>
    );
};

export default GridHeadColumn;
