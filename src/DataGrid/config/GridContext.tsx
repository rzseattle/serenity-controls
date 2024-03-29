import * as React from "react";
import { useContext } from "react";
import { IGridFilterComponent } from "../interfaces/IGridFilter";
import { ILocale } from "../interfaces/ILocale";

export interface IGridStore {
    gridClassName: string;
    locale: ILocale;
    persistStore: {
        set: <T>(componentName: string, variableName: string, variableValue: T) => boolean;
        get: <T>(componentName: string, variableName: string) => T | null;
    };
    common: {
        icons: {
            delete: JSX.Element;
        };
        components: {
            noData: React.FC<{ communicate: string }>;
            loading: React.FC<{ communicate: string }>;
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
            advancedEnable: JSX.Element;
            advancedDisable: JSX.Element;
            filter: JSX.Element;
            checked: JSX.Element;
            unchecked: JSX.Element;
            calendar: JSX.Element;
        };
    };
}
export interface IGridConfig {
    gridClassName: string;
}

export const GridContext = React.createContext<IGridStore>(null);

export const useGridContext = () => useContext<IGridStore>(GridContext);
