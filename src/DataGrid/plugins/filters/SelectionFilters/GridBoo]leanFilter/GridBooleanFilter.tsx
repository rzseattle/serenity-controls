import React, { useEffect, useRef } from "react";

import { IGridFilterComponent } from "../../../../interfaces/IGridFilter";
import { useGridContext } from "../../../../config/GridContext";
import styles from "./GridBoleanFilter.module.sass";
import GridFilterBody from "../../Common/GridFilterBody";

const GridBooleanFilter: IGridFilterComponent = ({ autoFocus, showCaption, onValueChange, filter }) => {
    const config = useGridContext();
    const ref = useRef<HTMLButtonElement>();
    useEffect(() => {
        //need to w8 to animation change
        setTimeout(() => {
            if (autoFocus) {
                ref.current.focus();
            }
        }, 10);
    }, [autoFocus]);
    const val = filter.value && ( filter.value[0]?.value == 1 || filter.value[0]?.value === true);
    console.log(filter.value)
    return (
        <GridFilterBody filter={filter} showCaption={showCaption}>
            <div className={styles.buttons}>
                <button
                    ref={ref}
                    tabIndex={1}
                    disabled={filter.value && filter.value.length &&  !val}
                    onClick={() =>
                        onValueChange([
                            { value: false, condition: "=", labelCondition:"", labelValue: "0" }, // labelCondition: config.filter.icons.unchecked,
                        ])
                    }
                >
                    {config.filter.icons.unchecked}
                </button>
                <button
                    tabIndex={2}
                    disabled={val}
                    onClick={() =>
                        onValueChange([
                            { value: true, condition: "=",  labelCondition:"", labelValue: "1" }, //labelCondition: config.filter.icons.checked
                        ])
                    }
                >
                    {config.filter.icons.checked}
                </button>
            </div>
        </GridFilterBody>
    );
};

export default GridBooleanFilter;
