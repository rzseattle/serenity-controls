import React from "react";

import { IGridFilterComponent } from "../../../interfaces/IGridFilter";
import styles from "./GridSwitchFilter.module.sass";
import { isSelected, onSelect } from "./Common";
import GridFilterBody from "../Common/GridFilterBody";

interface IGridSwitchFilterOption {
    value: string | number;
    label: string | number | JSX.Element;
}

export interface IGridSwitchFilterConfig {
    values: IGridSwitchFilterOption[];
    multiselect?: boolean;
    columns?: number;
}

const GridSwitchFilter: IGridFilterComponent = ({ onValueChange, filter }) => {
    const filterConfig: IGridSwitchFilterConfig = filter.config;

    return (
        <GridFilterBody filter={filter}>
            <div
                className={styles.buttons + " " + (filterConfig.columns > 0 ? styles.gridLayout : styles.noGridLayout)}
                style={
                    filterConfig.columns > 0
                        ? { gridTemplateColumns: "1fr ".repeat(filterConfig.columns), rowGap: 10 }
                        : {}
                }
            >
                {filterConfig.values.map((el: IGridSwitchFilterOption) => {
                    return (
                        <button
                            key={el.value}
                            className={isSelected(el.value, filter.value) ? styles.selected : ""}
                            onClick={() => onValueChange(onSelect(el, filter.value, filter.config.multiselect))}
                        >
                            {el.label}
                        </button>
                    );
                })}
            </div>
        </GridFilterBody>
    );
};

export default GridSwitchFilter;
