import React, { useEffect, useRef } from "react";

import { IGridFilterComponent } from "../../../../interfaces/IGridFilter";

import styles from "./GridSelectFilter.module.sass";
import { onSelect } from "../Common";
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
    const ref = useRef<HTMLSelectElement>();

    useEffect(() => {
        //need to w8 to animation change
        setTimeout(() => {
            if (autoFocus) {
                ref.current.focus();
            }
        }, 20);
    }, []);
    return (
        <GridFilterBody filter={filter} showCaption={showCaption}>
            <div className={styles.main}>
                <select
                    data-testid={"select"}
                    ref={ref}
                    value={filter.value[0]?.value}
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
                        return <option key={el.value}>{el.label}</option>;
                    })}
                </select>
            </div>
        </GridFilterBody>
    );
};

export default GridSelectFilter;
