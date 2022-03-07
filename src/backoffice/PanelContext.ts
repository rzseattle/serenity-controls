import * as React from "react";
import { useContext } from "react";

import { IModalProps } from "../Modal";

import { IRouteElement } from "./interfaces/IRouteElement";
import { ICommand } from "../CommandBar";

export interface IPanelContext {
    /**
     * Url without last action part
     */

    routeData: IRouteElement;

    baseURL: string;

    URL: string;

    basePath: string;

    notification(content: string, title?: string, conf?: any): any;

    reloadProps(args?: any, callback?: () => any): any;

    setPanelOption(name: string, value: string | number | boolean, callback?: () => any): any;

    goto(componentPath: string, args?: any, callback?: () => any): any;

    log(element: any): any;

    startLoadingIndicator(): any;

    stopLoadingIndicator(): any;

    isSub: boolean;

    openModal(route: string, input?: any, modalProps?: Partial<IModalProps>, props?: any): string;

    openContextMenu(coordinates: React.MouseEvent<HTMLElement, MouseEvent>, commands: ICommand[], context: any): any;

    closeModal(modalId: string): any;

    parentContext: IPanelContext;
}

export const PanelContext = React.createContext(null);

export const getPanelContext = () => useContext<IPanelContext>(PanelContext);
