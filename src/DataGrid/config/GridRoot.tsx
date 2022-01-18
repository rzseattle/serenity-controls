import React from "react";

import styles from "../DataGrid.module.sass";
import { GridContext, IGridConfig } from "./GridContext";
import locale from "../locale/en";
import GridTextFilter from "../plugins/filters/GridTextFilter";
import GridDateFilter from "../plugins/filters/GridDateFilter";
import GridNumericFilter from "../plugins/filters/GridNumericFilter";
import GridBooleanFilter from "../plugins/filters/GridBooleanFilter";
import { BsCalendar3, BsFilter } from "react-icons/bs";
import {
    AiOutlineArrowDown,
    AiOutlineArrowUp,
    AiOutlineCheck,
    AiOutlineClose,
    AiOutlineDatabase,
} from "react-icons/ai";
import ShimmerList from "../../Shimmer/ShimmerList";

const GridRoot = ({ children, options }: { children: React.ReactNode; options: Partial<IGridConfig> }) => {
    return (
        <>
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
                        },
                    },
                }}
            >
                {children}
            </GridContext.Provider>
        </>
    );
};

export default GridRoot;
