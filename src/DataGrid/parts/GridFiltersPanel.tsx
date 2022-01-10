import React from "react";
import { IGridFilter } from "../interfaces/IGridFilter";
import styles from "../filters/GridTextFilter.module.sass";
import { useGridContext } from "../config/GridContext";
import { IFiltersChange } from "../interfaces/IFiltersChange";
import { useImmer } from "use-immer";
import produce from "immer";

const GridFiltersPanel = ({
    filters,
    onFiltersChange,
}: {
    filters: IGridFilter[];
    onFiltersChange: IFiltersChange;
}) => {
    const config = useGridContext();

    const [localFilters, setLocalFilters] = useImmer<IGridFilter[]>(filters);

    return (
        <div onClick={(e) => e.stopPropagation()}>
            <div>
                {localFilters.map((filter, index) => {
                    const Component = filter.component ?? config.filter.components[filter.filterType];
                    return (
                        <>
                            {Component ? (
                                <Component
                                    key={filter.field + "" + filter.applyTo}
                                    filter={filter}
                                    onValueChange={(value) => {
                                        setLocalFilters((draft) => {
                                            draft[index].value = value;
                                        });
                                    }}
                                    onFilterChange={(filter) => {
                                        setLocalFilters(draft => {
                                            draft[index] = filter;
                                        })
                                    }}
                                />
                            ) : (
                                <div>No filter found</div>
                            )}
                        </>
                    );
                })}
            </div>

            <div className={styles.buttonPanel}>
                <button
                    className={styles.applyButtons}
                    onClick={() => {
                        onFiltersChange(
                            produce(filters, (draft) => {
                                draft.forEach((el) => (el.opened = false));
                            }),
                        );
                    }}
                >
                    {config.locale.cancel}
                </button>

                <button
                    className={styles.applyButtons}
                    onClick={() => {
                        onFiltersChange(
                            produce(localFilters, (draft) => {
                                draft.forEach((el) => (el.opened = false));
                            }),
                        );
                    }}
                >
                    {config.locale.apply}
                </button>
            </div>
        </div>
    );
};

export default GridFiltersPanel;
