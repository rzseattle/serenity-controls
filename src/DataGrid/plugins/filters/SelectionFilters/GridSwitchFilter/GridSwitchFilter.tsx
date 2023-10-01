import React, { useEffect, useRef } from "react";

import { IGridFilterComponent } from "../../../../interfaces/IGridFilter";
import styles from "./GridSwitchFilter.module.sass";
import { isSelected, onSelect } from "../Common";
import GridFilterBody from "../../Common/GridFilterBody";

interface IGridSwitchFilterOption {
    value: string | number;
    label: string | number | JSX.Element;
}

export interface IGridSwitchFilterConfig {
    values: IGridSwitchFilterOption[];
    multiselect?: boolean;
    columns?: number;
}

const GridSwitchFilter: IGridFilterComponent = ({ autoFocus, showCaption, onValueChange, filter, apply }) => {
    const filterConfig: IGridSwitchFilterConfig = filter.config;
    const columns = filterConfig?.columns !== undefined ? filterConfig.columns : Math.min(3, filterConfig.values.length);
    const ref = useRef<HTMLDivElement>();

    useEffect(() => {
        //need to w8 to animation change
        setTimeout(() => {
            if (autoFocus) {
                (ref.current.firstElementChild as HTMLButtonElement).focus();
            }
        }, 20);
    }, []);

    return (
        <GridFilterBody filter={filter} showCaption={showCaption}>
            <div
                className={styles.buttons + " " + (columns > 0 ? styles.gridLayout : styles.noGridLayout)}
                style={columns > 0 ? { gridTemplateColumns: "1fr ".repeat(columns), rowGap: 10 } : {}}
                ref={ref}
                data-testid={"button-container"}
            >
                {filterConfig?.values.map((el: IGridSwitchFilterOption) => {
                    return (
                        <button
                            key={el.value}
                            role="radio"
                            className={isSelected(el.value, filter?.value) ? styles.selected : ""}
                            onClick={() => {
                                const value = onSelect(el, filter.value, filter.config.multiselect);
                                onValueChange(value);

                                if (apply) {
                                    apply(value);
                                }
                            }}
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
