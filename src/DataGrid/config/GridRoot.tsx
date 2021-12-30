import React from "react";

import styles from "../DataGrid.module.sass";
import { GridContext, IGridConfig } from "./GridContext";
import GridTextFilter from "../filters/GridTextFilter";
import GridDateFilter from "../filters/GridDateFilter";

const GridRoot = ({ children, options }: { children: React.ReactNode; options: Partial<IGridConfig> }) => {
    return (
        <>
            <GridContext.Provider
                value={{
                    gridClassName: styles.gridLayout,
                    order: {
                        icons: {
                            asc: <>↓</>,
                            desc: <>↑</>,
                        },
                    },
                    filter: {
                        icons: { filter: <>⛛</> },
                        components: {
                            "text": GridTextFilter,
                            "date": GridDateFilter

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
