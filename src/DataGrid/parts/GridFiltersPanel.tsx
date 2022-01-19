import React from "react";
import { IGridFilter } from "../interfaces/IGridFilter";
import styles from "../plugins/filters/GridSharedFilterStyles.module.sass";
import { useGridContext } from "../config/GridContext";
import { IFiltersChange } from "../interfaces/IFiltersChange";
import { useImmer } from "use-immer";
import produce from "immer";
import sharedStyles from "../plugins/filters/GridSharedFilterStyles.module.sass";

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
        <div
            className={sharedStyles.main}
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                    onFiltersChange(
                        produce(localFilters, (draft) => {
                            draft.forEach((el) => (el.opened = false));
                        }),
                    );
                }
            }}
        >
            <div onClick={(e) => e.stopPropagation()}>
                <div>
                    {localFilters.map((filter, index) => {
                        const Component = filter.component ?? config.filter.components[filter.filterType];
                        return (
                            <React.Fragment key={filter.field + "" + filter.applyTo}>
                                {Component ? (
                                    <Component
                                        filter={filter}
                                        onValueChange={(value) => {
                                            setLocalFilters((draft) => {
                                                draft[index].value = value;
                                            });
                                        }}
                                        onFilterChange={(filter) => {
                                            setLocalFilters((draft) => {
                                                draft[index] = filter;
                                            });
                                        }}
                                    />
                                ) : (
                                    <div>No filter found</div>
                                )}
                            </React.Fragment>
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
        </div>
    );
};

export default GridFiltersPanel;
