import React, { useRef, useState } from "react";
import { IGridOrder } from "../../../interfaces/IGridOrder";
import { IOrderChange } from "../../../interfaces/IOrderChangeCallback";
import { IGridFilter } from "../../../interfaces/IGridFilter";
import { IFiltersChange } from "../../../interfaces/IFiltersChange";
import { useGridContext } from "../../../config/GridContext";
import { isGridColumnElementEqual } from "../../../helpers/helpers";
import produce from "immer";
import styles from "./GridConditionsPresenter.module.sass";
import GridFiltersModal from "../GridFiltersModal/GridFiltersModal";

const GridConditionsPresenter = ({
    order,
    onOrderChange,
    filters,
    onFiltersChange,
}: {
    order: IGridOrder[];
    onOrderChange: IOrderChange;
    filters: IGridFilter[];
    onFiltersChange: IFiltersChange;
}) => {
    const context = useGridContext();
    const [filtersVisible, setFiltersVisible] = useState(false);
    const [editedFilter, setEditedFilter] = useState<IGridFilter>();
    const filterTrigger = useRef<HTMLDivElement>();

    return (
        <>
            <div className={styles.main}>
                {order
                    .filter((el) => el.dir)
                    .map((el) => {
                        return (
                            <div
                                className={styles.orderElement}
                                key={el.field + "" + el.applyTo}
                                onClick={() => {
                                    onOrderChange(
                                        produce<IGridOrder[]>(order, (draft) => {
                                            for (const _order of draft) {
                                                if (isGridColumnElementEqual(_order, el)) {
                                                    _order.dir = _order.dir === "asc" ? "desc" : "asc";
                                                }
                                            }
                                        }),
                                    );
                                }}
                            >
                                <div className={styles.orderIcon}>{context.order.icons[el.dir]}</div>
                                <div className={styles.caption}>{el.caption ?? el.field}</div>
                                <div
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onOrderChange(
                                            produce<IGridOrder[]>(order, (draft) => {
                                                for (const _order of draft) {
                                                    if (isGridColumnElementEqual(_order, el)) {
                                                        _order.dir = undefined;
                                                    }
                                                }
                                            }),
                                        );
                                    }}
                                    className={styles.gridConditionsClose}
                                    data-testid={"delete-order"}
                                >
                                    {context.common.icons.delete}
                                </div>
                            </div>
                        );
                    })}

                {filters
                    .filter((el) => el.value && el.value.length > 0)
                    .map((filter) => {
                        return (
                            <div
                                key={filter.field + "" + filter.applyTo}
                                onClick={(e) => {
                                    filterTrigger.current = e.currentTarget;
                                    setEditedFilter(filter);
                                    setFiltersVisible(true);
                                }}
                                className={styles.filterElement}
                            >
                                <div className={styles.filterIcon}>{context.filter.icons.filter}</div>
                                <div className={styles.caption + " " + styles.filterCaption}>
                                    {filter.caption ?? filter.field}
                                </div>
                                <div className={styles.filterValues}>
                                    {filter.value.map((value, index) => {
                                        return (
                                            <div key={value.value + value.operator + value.condition}>
                                                <div className={styles.operator}>
                                                    {index > 0 && <>{value.operator ?? "and"}</>}
                                                </div>
                                                <div className={styles.condition}>
                                                    {value.labelCondition ?? value.condition}
                                                </div>
                                                <div className={styles.value}>
                                                    <span
                                                        dangerouslySetInnerHTML={{
                                                            __html: value.labelValue ?? value.value,
                                                        }}
                                                    ></span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div
                                    data-testid={"delete-filter"}
                                    className={styles.gridConditionsClose}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onFiltersChange(
                                            produce(filters, (draft) => {
                                                draft.map((sub) => {
                                                    if (isGridColumnElementEqual(sub, filter)) {
                                                        sub.value = [];
                                                    }
                                                    return sub;
                                                });
                                            }),
                                        );
                                    }}
                                >
                                    {context.common.icons.delete}
                                </div>
                            </div>
                        );
                    })}

                <a
                    data-testid={"delete-all-conditions"}
                    className={styles.deleteAll}
                    onClick={() => {
                        onFiltersChange(
                            produce(filters, (draft) => {
                                for (const el of draft) {
                                    el.value = [];
                                }
                            }),
                        );

                        onOrderChange(
                            produce<IGridOrder[]>(order, (draft) => {
                                for (const el of draft) {
                                    if (el.dir) {
                                        el.dir = undefined;
                                    }
                                }
                            }),
                        );
                    }}
                >
                    {context.common.icons.delete}
                </a>
            </div>
            {filtersVisible && (
                <GridFiltersModal
                    relativeTo={filterTrigger.current}
                    onHide={() => setFiltersVisible(false)}
                    onFiltersChange={onFiltersChange}
                    editedFilter={[editedFilter]}
                    filters={filters}
                />
            )}
        </>
    );
};

export default GridConditionsPresenter;
