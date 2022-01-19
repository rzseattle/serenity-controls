import React, { useRef, useState } from "react";
import { IGridOrder } from "../interfaces/IGridOrder";
import { IOrderChange } from "../interfaces/IOrderChangeCallback";
import { IGridFilter } from "../interfaces/IGridFilter";
import { IFiltersChange } from "../interfaces/IFiltersChange";
import { useGridContext } from "../config/GridContext";
import { isGridColumnElementEqual } from "../helpers/helpers";
import produce from "immer";
import styles from "./GridConditionsPresenter.module.sass";
import headStylesTMPTODO from "./GridHeadColumn.module.sass";
import { Modal } from "../../Modal";
import { RelativePositionPresets } from "../../Positioner";
import GridFiltersPanel from "./GridFiltersPanel";

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
                                <div>
                                    {context.order.icons[el.dir]} {el.field}
                                </div>
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
                            >
                                <div>{context.filter.icons.filter}</div>
                                <div>{filter.caption ?? filter.field}</div>
                                <div style={{ textAlign: "left" }}>
                                    {filter.value.map((value, index) => {
                                        return (
                                            <div key={index + value.value}>
                                                {value.labelCondition ?? value.condition}{" "}
                                                {value.labelValue ?? value.value}{" "}
                                            </div>
                                        );
                                    })}
                                </div>
                                <div
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
                        className={headStylesTMPTODO.filtersPanelContainer}
                        style={{}}
                    >
                        <GridFiltersPanel
                            onFiltersChange={(localFilters) => {
                                setFiltersVisible(false);

                                onFiltersChange(
                                    produce(filters, (draft) => {
                                        draft.forEach((el) => {
                                            if (isGridColumnElementEqual(el, localFilters[0])) {
                                                el.value = localFilters[0].value;
                                            }
                                        });
                                    }),
                                );
                            }}
                            filters={[editedFilter]}
                        />
                    </div>
                </Modal>
            )}
        </>
    );
};

export default GridConditionsPresenter;
