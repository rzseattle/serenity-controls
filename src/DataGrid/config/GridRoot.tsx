import React from "react";

import styles from "../DataGrid.module.sass";
import { GridContext, IGridConfig } from "./GridContext";
import GridTextFilter from "../filters/GridTextFilter";
import GridDateFilter from "../filters/GridDateFilter";
import locale from "../locale/en";
import GridCommonFilter from "../filters/GridCommonFilter";
import GridNumericFilter from "../filters/GridNumericFilter";
import GridBooleanFilter from "../filters/GridBooleanFilter";

const GridRoot = ({ children, options }: { children: React.ReactNode; options: Partial<IGridConfig> }) => {
    return (
        <>
            <GridContext.Provider
                value={{
                    locale,
                    gridClassName: styles.gridLayout,
                    common: {
                        icons: {
                            delete: <>x</>,
                        },
                    },
                    order: {
                        icons: {
                            asc: <>↓</>,
                            desc: <>↑</>,
                        },
                    },
                    filter: {
                        icons: {
                            filter: <>‡</>,
                            checked: <>V</>,
                            unchecked: <>X</>

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
