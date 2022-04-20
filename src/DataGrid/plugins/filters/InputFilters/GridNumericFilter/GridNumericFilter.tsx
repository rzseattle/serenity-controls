import React, { useEffect, useRef } from "react";
import GridAdvancedFilterContainer from "../GridCommonFilter/GridAdvancedFilterContainer";
import { useGridContext } from "../../../../config/GridContext";
import { IGridFilterComponent } from "../../../../interfaces/IGridFilter";

const GridNumericFilter: IGridFilterComponent = ({ autoFocus, showCaption, onFilterChange, onValueChange, filter }) => {
    const config = useGridContext();
    const ref = useRef<HTMLInputElement>();
    useEffect(() => {
        //need to w8 to animation change
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
                        type="number"
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

                { value: "<", label: config.locale.filter.smaller },
                { value: "<=", label: config.locale.filter.smallerEqual },
                { value: ">", label: config.locale.filter.greater },
                { value: ">=", label: config.locale.filter.greaterEqual },
            ]}
        />
    );
};

export default GridNumericFilter;
