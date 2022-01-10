import React from "react";
import { IGridFilterComponent } from "../interfaces/IGridFilter";
import GridCommonFilter from "./GridCommonFilter";
import { useGridContext } from "../config/GridContext";
import { fI18n } from "../../lib";

const GridNumericFilter: IGridFilterComponent = ({ onFilterChange, onValueChange, filter }) => {
    const config = useGridContext();
    return (
        <GridCommonFilter
            filter={filter}
            onFilterChange={onFilterChange}
            onValueChange={onValueChange}
            fieldComponent={(value, onchange) => {
                return (
                    <div>
                        numeric
                        <input value={value.value} onChange={(e) => onchange(e.target.value, null)} />
                    </div>
                );
            }}
            conditions={[
                { value: "LIKE", label: config.locale.filter.like },
                { value: "=", label: config.locale.filter.equals },
                { value: "!=", label: config.locale.filter.differentThan },


                { value: "<", label: config.locale.filter.smaller },
                { value: "<=", label: config.locale.filter.smallerEqual },
                { value: ">", label: config.locale.filter.greater },
                { value: ">=", label: config.locale.filter.greaterEqual },


            ]}
        />
    );
};

export default GridNumericFilter;


