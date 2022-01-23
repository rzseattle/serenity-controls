import React from "react";

import { IGridFilter } from "../../../interfaces/IGridFilter";

import sharedStyles from "./GridFilterBody.module.sass";
import produce from "immer";

const GridFilterBody = ({
    filter,
    children,
    onFilterChange,
    showAdvancedSwitch = false,
    showCaption
}: {
    filter: IGridFilter;
    children: JSX.Element | JSX.Element[];
    onFilterChange?: (filter: IGridFilter) => unknown;
    showAdvancedSwitch?: boolean;
    showCaption?: boolean
}) => {
    return (
        <div className={sharedStyles.main}>
            <div className={sharedStyles.body}>
                {showCaption && filter.caption  && (
                    <div className={sharedStyles.title}>
                        {showAdvancedSwitch ? (
                            <a
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onFilterChange(
                                        produce<IGridFilter>(filter, (draft) => {
                                            draft.isInAdvancedMode = !draft.isInAdvancedMode;
                                        }),
                                    );
                                }}
                            >
                                {filter.isInAdvancedMode ? "-" : "+"} {filter.caption}
                            </a>
                        ) : (
                            filter.caption
                        )}
                    </div>
                )}

                {children}
                {filter.description && <div className={sharedStyles.description}>{filter.description}</div>}
            </div>
        </div>
    );
};

export default GridFilterBody;
