import React from "react";

import styles from "../DataGrid.module.sass";
import { GridContext, IGridConfig } from "./GridContext";

const GridRoot = ({ children, options }: { children: React.ReactNode; options: Partial<IGridConfig> }) => {
    return (
        <>
            <GridContext.Provider
                value={{
                    gridClassName: styles.gridLayout,
                    icons: {
                        order: {
                            asc: <>↓</>,
                            desc: <>↑</>,
                        },
                        filter: <>⛛</>,
                    },
                }}
            >
                {children}
            </GridContext.Provider>
        </>
    );
};

export default GridRoot;
