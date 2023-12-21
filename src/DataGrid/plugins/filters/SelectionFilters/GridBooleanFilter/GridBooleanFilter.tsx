import React, { useEffect, useRef } from "react";

import { IGridFilterComponent } from "../../../../interfaces/IGridFilter";
import { useGridContext } from "../../../../config/GridContext";
import styles from "./GridBoleanFilter.module.sass";
import GridFilterBody from "../../Common/GridFilterBody";

const GridBooleanFilter: IGridFilterComponent = ({ autoFocus, showCaption, onValueChange, filter, apply }) => {
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
    const val = filter.value && (filter.value[0]?.value == 1 || filter.value[0]?.value === true);

    return (
        <GridFilterBody filter={filter} showCaption={showCaption}>
            <div className={styles.buttons}>
                <button
                    ref={ref}
                    tabIndex={1}
                    disabled={filter.value && filter.value.length && !val}
                    onClick={() => {
                        const value = [
                            {
                                value: false,
                                condition: "=",
                                labelCondition: "",
                                labelValue: "&#x2715;", //config.filter.icons.unchecked,
                            },
                        ];
                        onValueChange(value);

                        if (apply) {
                            apply(value);
                        }
                    }}
                >
                    {config.filter.icons.unchecked}
                </button>
                <button
                    tabIndex={2}
                    disabled={val}
                    onClick={() => {
                        const value = [
                            {
                                value: true,
                                condition: "=",
                                labelCondition: "",
                                labelValue: "&#x2713;", //config.filter.icons.checked,
                            },
                        ];
                        onValueChange(value);
                        if (apply) {
                            apply(value);
                        }
                    }}
                >
                    {config.filter.icons.checked}
                </button>
            </div>
        </GridFilterBody>
    );
};

export default GridBooleanFilter;
