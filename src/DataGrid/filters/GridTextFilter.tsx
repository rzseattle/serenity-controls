import React from "react";
import { IGridFilterComponent } from "../interfaces/IGridFilter";

const GridTextFilter: IGridFilterComponent = ({ onApply, filter, hide }) => {
    return (
        <div
            onClick={() => {
                onApply([{ value: 12, condition: "=" }]);
            }}
        >
            Text filter for ( {filter.caption} ) <br />
            {filter.description} 12
            <button onClick={() => hide()}>cancel</button>
        </div>
    );
};

export default GridTextFilter;
