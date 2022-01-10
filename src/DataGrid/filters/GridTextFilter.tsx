import React from "react";
import { IGridFilterComponent } from "../interfaces/IGridFilter";
import GridCommonFilter from "./GridCommonFilter";
import { useGridContext } from "../config/GridContext";

const GridTextFilter: IGridFilterComponent = ({ onFilterChange, onValueChange, filter }) => {
    const config = useGridContext();
    return (
        <GridCommonFilter
            filter={filter}
            onFilterChange={onFilterChange}
            onValueChange={onValueChange}
            fieldComponent={(value, onchange) => {
                return <input value={value.value} onChange={(e) => onchange(e.target.value, null)} />;
            }}
            conditions={[
                { value: "LIKE", label: config.locale.filter.like },
                { value: "=", label: config.locale.filter.equals },
                { value: "!=", label: config.locale.filter.differentThan },
                { value: "NOT LIKE", label: config.locale.filter.notLike },
                { value: "^%", label: config.locale.filter.startsWith },
                { value: "%$", label: config.locale.filter.endsWith },
            ]}
        />
    );
};

export default GridTextFilter;
