import * as React from "react";
import { useContext } from "react";
import { IGridFilterComponent } from "../interfaces/IGridFilter";

export interface IGridStore {
    gridClassName: string;
    common: {
        icons: {
            delete: JSX.Element;
        };
    };
    order: {
        icons: {
            asc: JSX.Element;
            desc: JSX.Element;
        };
    };
    filter: {
        components: Record<string, IGridFilterComponent>;
        icons: {
            filter: JSX.Element;
        };
    };
}
export interface IGridConfig {
    gridClassName: string;
}

export const GridContext = React.createContext<IGridStore>(null);

export const useGridContext = () => useContext<IGridStore>(GridContext);
