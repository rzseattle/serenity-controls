import React from "react";

import { IGridFilterComponent } from "../../../../interfaces/IGridFilter";

import styles from "./GridSelectFilter.module.sass";
import { isSelected, onSelect } from "../Common";
import GridFilterBody from "../../Common/GridFilterBody";

interface IGridSelectFilterOption {
    value: string | number;
    label: string | number;
}

export interface IGridSelectFilterConfig {
    values: IGridSelectFilterOption[];
}

const GridSelectFilter: IGridFilterComponent = ({ autoFocus, showCaption, onValueChange, filter }) => {
    const filterConfig: IGridSelectFilterConfig = filter.config;

    return (
        <GridFilterBody filter={filter} showCaption={showCaption}>
            <div className={styles.main}>
                <select
                    onChange={(e) => {
                        const index = e.currentTarget.selectedIndex;

                        if (index !== 0) {
                            onValueChange(onSelect(filterConfig.values[index - 1], filter.value));
                        } else {
                            //onSelect(filterConfig.values[index - 1]);
                            onValueChange([]);
                        }
                    }}
                >
                    <option value="-1"> --- </option>
                    {filterConfig.values.map((el: IGridSelectFilterOption) => {
                        return (
                            <option key={el.value} selected={isSelected(el.value, filter.value)}>
                                {el.label}
                            </option>
                        );
                    })}
                </select>
            </div>
        </GridFilterBody>
    );
};

export default GridSelectFilter;
