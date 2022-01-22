import React from "react";

import { IGridFilterComponent } from "../../../interfaces/IGridFilter";
import { useGridContext } from "../../../config/GridContext";
import styles from "./GridBoleanFilter.module.sass";
import GridFilterBody from "../Common/GridFilterBody";

const GridBooleanFilter: IGridFilterComponent = ({ onValueChange, filter }) => {
    const config = useGridContext();
    return (
        <GridFilterBody filter={filter}>
            <div className={styles.buttons}>
                <button
                    disabled={filter.value[0]?.value == 0}
                    onClick={() =>
                        onValueChange([
                            { value: false, condition: "=",  labelValue: "" }, // labelCondition: config.filter.icons.unchecked,
                        ])
                    }
                >
                    {config.filter.icons.unchecked}
                </button>
                <button
                    disabled={filter.value[0]?.value == 1}
                    onClick={() =>
                        onValueChange([
                            { value: true, condition: "=",  labelValue: "" }, //labelCondition: config.filter.icons.checked
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
