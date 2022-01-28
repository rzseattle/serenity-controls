import React from "react";
import { IGridFilter } from "../../../interfaces/IGridFilter";
import { useGridContext } from "../../../config/GridContext";
import { IFiltersChange } from "../../../interfaces/IFiltersChange";
import { useImmer } from "use-immer";
import styles from "./GridFiltersPanel.module.sass";

export interface IGridFilterProps {
    filters: IGridFilter[];
    onFiltersChange: IFiltersChange;
}

const GridFiltersPanel = ({ filters, onFiltersChange }: IGridFilterProps) => {
    const config = useGridContext();

    const [localFilters, setLocalFilters] = useImmer<IGridFilter[]>(filters);

    if (filters.length === 0) {
        return <div className={styles.empty}> No filters </div>;
    }

    return (
        <div
            className={styles.main}
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                    onFiltersChange(localFilters);
                }
            }}
        >
            <div onClick={(e) => e.stopPropagation()}>
                <div className={styles.body}>
                    {localFilters.map((filter, index) => {
                        const Component = filter.component ?? config.filter.components[filter.filterType];
                        return (
                            <React.Fragment key={filter.field + "" + filter.applyTo + filter.filterType + filter.label}>
                                {Component ? (
                                    <Component
                                        showCaption={localFilters.length > 1}
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

                <div className={styles.buttonsPanel}>
                    {filters.filter((el) => el.isInAdvancedMode !== undefined).length > 0 && (
                        <button
                            data-testid={"switch-to-advanced"}
                            className={styles.applyButton + " " + styles.advancedButton}
                            onClick={() => {
                                setLocalFilters((draft) => {
                                    draft.forEach((el) => (el.isInAdvancedMode = !el.isInAdvancedMode));
                                });
                            }}
                        >
                            {config.filter.icons.advanced}
                        </button>
                    )}
                    <button
                        className={styles.applyButton}
                        onClick={() => {
                            onFiltersChange(filters);
                        }}
                    >
                        {config.locale.cancel}
                    </button>

                    <button
                        data-testid={"apply-filter"}
                        className={styles.applyButton}
                        onClick={() => {
                            onFiltersChange(localFilters);
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
