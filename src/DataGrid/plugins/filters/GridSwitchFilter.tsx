import React from "react";

import { IGridFilterComponent } from "../../interfaces/IGridFilter";
import { useGridContext } from "../../config/GridContext";

import sharedStyles from "./GridSharedFilterStyles.module.sass";
import styles from "./GridBoleanFilter.module.sass";

const GridSwitchFilter: IGridFilterComponent = ({ onValueChange, filter }) => {
    const config = useGridContext();
    return (
        <div className={sharedStyles.main}>
            {filter.caption && <div className={sharedStyles.title}>{filter.caption}</div>}
            <div className={styles.buttons}>
                <button
                    disabled={filter.value[0]?.value == 0}
                    onClick={() =>
                        onValueChange([
                            { value: 0, condition: "=", labelCondition: config.filter.icons.unchecked, labelValue: "" },
                        ])
                    }
                >
                    {config.filter.icons.unchecked}{" "}
                </button>
                <button
                    disabled={filter.value[0]?.value == 1}
                    onClick={() =>
                        onValueChange([
                            { value: 1, condition: "=", labelCondition: config.filter.icons.checked, labelValue: "" },
                        ])
                    }
                >
                    {config.filter.icons.checked}{" "}
                </button>
            </div>

            {filter.description && <div className={sharedStyles.description}>{filter.description}</div>}
        </div>
    );
};

export default GridSwitchFilter;
