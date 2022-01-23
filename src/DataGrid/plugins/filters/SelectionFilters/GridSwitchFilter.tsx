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

const GridSwitchFilter: IGridFilterComponent = ({ showCaption, onValueChange, filter }) => {
    const filterConfig: IGridSwitchFilterConfig = filter.config;

    const columns = filterConfig.columns !== undefined ? filterConfig.columns : 3;

    return (
        <GridFilterBody filter={filter} showCaption={showCaption}>
            <div
                className={styles.buttons + " " + (filterConfig.columns > 0 ? styles.gridLayout : styles.noGridLayout)}
                style={columns > 0 ? { gridTemplateColumns: "1fr ".repeat(columns), rowGap: 10 } : {}}
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
