import React from "react";

import styles from "../DataGrid.module.sass";
import { GridContext, IGridConfig } from "./GridContext";
import locale from "../locale/en";
import GridTextFilter from "../plugins/filters/GridTextFilter";
import GridDateFilter from "../plugins/filters/GridDateFilter";
import GridNumericFilter from "../plugins/filters/GridNumericFilter";
import GridBooleanFilter from "../plugins/filters/GridBooleanFilter";
import { BsCalendar3, BsFilter } from "react-icons/bs";
import { AiOutlineArrowDown, AiOutlineArrowUp, AiOutlineCheck, AiOutlineClose } from "react-icons/all";

const GridRoot = ({ children, options }: { children: React.ReactNode; options: Partial<IGridConfig> }) => {
    return (
        <>
            <GridContext.Provider
                value={{
                    locale,
                    gridClassName: styles.gridLayout,
                    common: {
                        icons: {
                            delete: <><AiOutlineClose /></>,
                        },
                    },
                    order: {
                        icons: {
                            asc: <><AiOutlineArrowDown /></>,
                            desc: <><AiOutlineArrowUp /></>,
                        },
                    },
                    filter: {
                        icons: {
                            filter: <><BsFilter /></>,
                            checked: <><AiOutlineCheck /></>,
                            unchecked: <><AiOutlineClose /></>,
                            calendar: <><BsCalendar3 /></>,
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
