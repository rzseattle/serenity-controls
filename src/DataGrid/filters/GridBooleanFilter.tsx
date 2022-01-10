import React from "react";
import { IGridFilterComponent } from "../interfaces/IGridFilter";
import { useGridContext } from "../config/GridContext";
import styles from "./GridTextFilter.module.sass";

const GridBooleanFilter: IGridFilterComponent = ({  onValueChange, filter }) => {
    const config = useGridContext();
    return (
        <div>
            {filter.caption && (
                <div className={styles.title}>
                    {filter.caption}

                </div>
            )}

            <button disabled={filter.value[0]?.value == 0} onClick={() => onValueChange([
                {  value: 0, condition: "=", }
            ])}> {config.filter.icons.unchecked} </button>
            <button disabled={filter.value[0]?.value == 1} onClick={() => onValueChange([
                {  value: 1, condition: "=", }
            ])}> {config.filter.icons.checked} </button>

            {filter.description && <div className={styles.description}>{filter.description}</div>}
        </div>
    );
};

export default GridBooleanFilter;
