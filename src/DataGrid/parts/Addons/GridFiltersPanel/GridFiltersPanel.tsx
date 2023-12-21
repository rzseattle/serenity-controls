import React, { useState } from "react";
import { IGridFilter, IGridFilterValue } from "../../../interfaces/IGridFilter";
import { useGridContext } from "../../../config/GridContext";
import { IFiltersChange } from "../../../interfaces/IFiltersChange";
import { useImmer } from "use-immer";
import styles from "./GridFiltersPanel.module.sass";
import produce from "immer";

export interface IGridFilterProps {
    filters: IGridFilter[];
    onFiltersChange: IFiltersChange;
    onCancel: () => any;
}

const GridFiltersPanel = ({ filters, onFiltersChange, onCancel }: IGridFilterProps) => {
    const config = useGridContext();

    const [localFilters, setLocalFilters] = useImmer<IGridFilter[]>(filters);
    const [isInAdvancedMode, setAdvancedMode] = useState(false);

    if (filters.length === 0) {
        return <div className={styles.empty}> No filters </div>;
    }

    let displayBottomButtons = false;

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
                        const additionalProps: any = {};
                        displayBottomButtons = displayBottomButtons || filter.selfManagedSubmission !== true;
                        if (filter.selfManagedSubmission === true) {
                            additionalProps.apply = (value: IGridFilterValue[]) => {
                                const fastChange = produce(localFilters, (draft) => {
                                    draft[index].value = value;
                                });
                                onFiltersChange(fastChange);
                            };
                            additionalProps.cancel = () => onCancel();
                        }
                        return (
                            <React.Fragment key={filter.field + "" + filter.applyTo + filter.filterType}>
                                {Component ? (
                                    <Component
                                        showCaption={localFilters.length > 1}
                                        autoFocus={index === 0}
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
                                        {...additionalProps}
                                    />
                                ) : (
                                    <div>No filter found</div>
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>

                {displayBottomButtons && (
                    <>
                        <div className={styles.buttonsPanel}>
                            {filters.filter((el) => el.isInAdvancedMode !== undefined && el.isInAdvancedMode).length >
                                0 && (
                                <button
                                    data-testid={"switch-to-advanced"}
                                    className={styles.applyButton + " " + styles.advancedButton}
                                    onClick={() => {
                                        setLocalFilters((draft) => {
                                            draft.forEach((el) => (el.isInAdvancedMode = !isInAdvancedMode));
                                        });
                                        setAdvancedMode(!isInAdvancedMode);
                                    }}
                                >
                                    {isInAdvancedMode
                                        ? config.filter.icons.advancedDisable
                                        : config.filter.icons.advancedEnable}
                                </button>
                            )}

                            <button
                                data-testid={"cancel-filter"}
                                className={styles.applyButton}
                                onClick={() => {
                                    onCancel();
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
                    </>
                )}
            </div>
        </div>
    );
};

export default GridFiltersPanel;
