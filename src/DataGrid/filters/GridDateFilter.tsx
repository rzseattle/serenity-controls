import React from "react";
import { IGridFilterComponent } from "../interfaces/IGridFilter";
import GridCommonFilter from "./GridCommonFilter";
import { useGridContext } from "../config/GridContext";

const GridDateFilter: IGridFilterComponent = ({ onFilterChange, onValueChange, filter }) => {
    const config = useGridContext();
    return (
        <GridCommonFilter
            filter={filter}
            onFilterChange={onFilterChange}
            onValueChange={onValueChange}
            fieldComponent={(value, onchange) => {
                return (
                    <div>
                        date
                        {value.condition !== "set" && (
                            <input value={value.value} onChange={(e) => onchange(e.target.value, null)} />
                        )}
                    </div>
                );
            }}
            conditions={[
                { value: "=", label: config.locale.filter.equals },
                { value: "!=", label: config.locale.filter.differentThan },
                { value: "set", label: config.locale.filter.dateIsSet },
                { value: "notSet", label: config.locale.filter.dateIsNotSet },
            ]}
        />
    );
};

export default GridDateFilter;
