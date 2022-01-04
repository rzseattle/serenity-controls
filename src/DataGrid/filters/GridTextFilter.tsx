import React from "react";
import { IGridFilterComponent } from "../interfaces/IGridFilter";
import { fI18n } from "../../lib";
import { useGridContext } from "../config/GridContext";

const GridTextFilter: IGridFilterComponent = ({ onApply, filter, hide }) => {
    const config = useGridContext();
    return (
        <div
            onClick={() => {
                onApply([{ value: 12, condition: "=" }]);
            }}
        >
            {false && filter.caption && <div className={"w-filter-title"}>{filter.caption}</div>}
            <input type="text" />
            <br/>
            {filter.description}
            {/*LIKE: fI18n.t("frontend:filters.text.like"), "==": fI18n.t("frontend:filters.text.equals"), "!=":*/}
            {/*fI18n.t("frontend:filters.text.differentThan"), "NOT LIKE": fI18n.t("frontend:filters.text.notLike"), "^%":*/}
            {/*fI18n.t("frontend:filters.text.startsWith"), "%$": fI18n.t("frontend:filters.text.endsWith"),*/}
            <button onClick={() => hide()}>cancel</button>
        </div>
    );
};

export default GridTextFilter;
