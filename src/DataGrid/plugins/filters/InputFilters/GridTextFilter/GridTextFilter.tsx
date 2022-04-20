import React, { useEffect, useRef } from "react";
import GridAdvancedFilterContainer from "../GridCommonFilter/GridAdvancedFilterContainer";
import { useGridContext } from "../../../../config/GridContext";
import { IGridFilterComponent } from "../../../../interfaces/IGridFilter";

const GridTextFilter: IGridFilterComponent = ({ onFilterChange, autoFocus, onValueChange, showCaption, filter }) => {
    const config = useGridContext();
    const ref = useRef<HTMLInputElement>();
    useEffect(() => {
        if (autoFocus) {
            ref.current.focus();
        }
    }, [ref.current]);
    return (
        <GridAdvancedFilterContainer
            showCaption={showCaption}
            filter={filter}
            onFilterChange={onFilterChange}
            onValueChange={onValueChange}
            fieldComponent={(value, onchange) => {
                return (
                    <input
                        data-testid="input"
                        ref={ref}
                        value={value.value}
                        onChange={(e) => onchange(e.target.value, null)}
                    />
                );
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
