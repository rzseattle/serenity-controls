import * as React from "react";
import { useContext } from "react";
import { IGridFilterComponent } from "../interfaces/IGridFilter";

export interface IGridStore {
    gridClassName: string;
    icons: {
        order: {
            asc: JSX.Element;
            desc: JSX.Element;
        };
        filter: {
            components: {
                text: IGridFilterComponent;
                number: IGridFilterComponent;
                boolean: IGridFilterComponent;
            };
        };
    };
}
export interface IGridConfig {
    gridClassName: string;
}

export const GridContext = React.createContext<IGridStore>(null);

export const useGridContext = () => useContext<IGridStore>(GridContext);
