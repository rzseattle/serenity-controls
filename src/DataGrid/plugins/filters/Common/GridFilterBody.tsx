import React from "react";

import { IGridFilter } from "../../../interfaces/IGridFilter";

import sharedStyles from "../GridSharedFilterStyles.module.sass";
import produce from "immer";

const GridFilterBody = ({
    filter,
    children,
    onFilterChange,
    showAdvancedSwitch = false,
}: {
    filter: IGridFilter;
    children: JSX.Element;
    onFilterChange?: (filter: IGridFilter) => unknown;
    showAdvancedSwitch?: boolean;
}) => {
    return (
        <div className={sharedStyles.main}>
            {filter.caption && (
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
    );
};

export default GridFilterBody;
