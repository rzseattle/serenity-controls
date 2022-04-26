import React from "react";

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
import { ShimmerList } from "../../Shimmer/ShimmerList";
import GridTextFilter from "../plugins/filters/InputFilters/GridTextFilter/GridTextFilter";
import GridDateFilter from "../plugins/filters/InputFilters/GridDateFilter/GridDateFilter";
import GridNumericFilter from "../plugins/filters/InputFilters/GridNumericFilter/GridNumericFilter";
import GridBooleanFilter from "../plugins/filters/SelectionFilters/GridBoleanFilter/GridBooleanFilter";
import GridSwitchFilter from "../plugins/filters/SelectionFilters/GridSwitchFilter/GridSwitchFilter";
import GridSelectFilter from "../plugins/filters/SelectionFilters/GridSelectFilter/GridSelectFilter";

const GridRoot = ({ children, options }: { children: React.ReactNode; options?: Partial<IGridConfig> }) => {
    return (
        <GridContext.Provider
            value={{
                locale,
                gridClassName: styles.gridLayout,
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
                                    <ShimmerList rows={10} />
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

export default GridRoot;
