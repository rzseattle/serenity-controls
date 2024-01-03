import React, { useEffect, useRef } from "react";

import styles from "../DataGrid.module.sass";
import { GridContext, IGridConfig } from "./GridContext";
import locale from "../locale/en";
import { BsCalendar3, BsFilter } from "react-icons/bs";
import {
    AiOutlineArrowDown,
    AiOutlineArrowUp,
    AiOutlineCheck,
    AiOutlineClose,
    AiOutlineDatabase,
    AiOutlineMinus,
    AiOutlinePlus,
} from "react-icons/ai";
import { ShimmerList } from "../../Shimmer";
import GridTextFilter from "../plugins/filters/InputFilters/GridTextFilter/GridTextFilter";
import GridDateFilter from "../plugins/filters/InputFilters/GridDateFilter/GridDateFilter";
import GridNumericFilter from "../plugins/filters/InputFilters/GridNumericFilter/GridNumericFilter";
import GridBooleanFilter from "../plugins/filters/SelectionFilters/GridBooleanFilter/GridBooleanFilter";
import GridSwitchFilter from "../plugins/filters/SelectionFilters/GridSwitchFilter/GridSwitchFilter";
import GridSelectFilter from "../plugins/filters/SelectionFilters/GridSelectFilter/GridSelectFilter";

const GridRoot = ({ children }: { children: React.ReactNode; options?: Partial<IGridConfig> }) => {
    const local = useRef<Record<string, Record<string, unknown>>>({});
    useEffect(() => {
        local.current = JSON.parse(window.localStorage["serenity-controls-store"] || "{}");
    }, []);

    return (
        <GridContext.Provider
            value={{
                locale,
                gridClassName: styles.gridLayout,
                persistStore: {
                    set: <T,>(componentName: string, variableName: string, variableValue: T) => {
                        local.current[componentName] = local.current[componentName] ? local.current[componentName] : {};
                        local.current[componentName][variableName] = variableValue;
                        window.localStorage["serenity-controls-store"] = JSON.stringify(local);
                        return true;
                    },
                    get: <T,>(componentName: string, variableName: string): T | null => {
                        return (local.current?.[componentName]?.[variableName] as T) ?? null;
                    },
                },
                common: {
                    icons: {
                        delete: (
                            <>
                                <AiOutlineClose />
                            </>
                        ),
                    },
                    components: {
                        noData: ({ communicate }: { communicate: string }) => {
                            return (
                                <div style={{ padding: 40, fontSize: 30, color: "lightgray" }}>
                                    <AiOutlineDatabase style={{ verticalAlign: "text-bottom" }} />
                                    {communicate}
                                </div>
                            );
                        },
                        loading: () => {
                            return (
                                <div style={{ opacity: 0.4 }}>
                                    <ShimmerList items={10} />
                                </div>
                            );
                        },
                    },
                },
                order: {
                    icons: {
                        asc: (
                            <>
                                <AiOutlineArrowDown />
                            </>
                        ),
                        desc: (
                            <>
                                <AiOutlineArrowUp />
                            </>
                        ),
                    },
                },
                filter: {
                    icons: {
                        advancedEnable: <AiOutlinePlus />,
                        advancedDisable: <AiOutlineMinus />,
                        filter: (
                            <>
                                <BsFilter />
                            </>
                        ),
                        checked: (
                            <>
                                <AiOutlineCheck />
                            </>
                        ),
                        unchecked: (
                            <>
                                <AiOutlineClose />
                            </>
                        ),
                        calendar: (
                            <>
                                <BsCalendar3 />
                            </>
                        ),
                    },
                    components: {
                        text: GridTextFilter,
                        date: GridDateFilter,
                        numeric: GridNumericFilter,
                        boolean: GridBooleanFilter,
                        switch: GridSwitchFilter,
                        select: GridSelectFilter,
                    },
                },
            }}
        >
            {children}
        </GridContext.Provider>
    );
};

export { GridRoot };
