import * as React from "react";
import { useContext } from "react";

export interface IGridStore {
    gridClassName: string;
    icons: {
        order: {
            asc: JSX.Element;
            desc: JSX.Element;
        };
        filter: JSX.Element;
    };
}
export interface IGridConfig {
    gridClassName: string;
}

export const GridContext = React.createContext<IGridStore>(null);

export const useGridContext = () => useContext<IGridStore>(GridContext);
