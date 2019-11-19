import * as React from "react";

import {IModalProps} from "../Modal";
import * as NotificationSystem from "react-notification-system";
import {useContext} from "react";
import { IRouteElement } from "./interfaces/IRouteElement";


export interface IPanelContext {
    /**
     * Url without last action part
     */

    routeData: IRouteElement,

    baseURL: string;

    basePath: string;


    notification(content: string, title?: string, conf?: NotificationSystem.Notification): any;

    reloadProps(args?: any, callback?: () => any): any;

    setPanelOption(name: string, value: string | number | boolean, callback?: () => any): any;

    goto(componentPath: string, args?: any, callback?: () => any): any;

    log(element: any): any;

    startLoadingIndicator(): any;

    stopLoadingIndicator(): any;

    isSub: boolean;

    openModal(route: string, input?: any, modalProps?: Partial<IModalProps>, props?: any): string;

    closeModal(modalId: string): any;

    parentContext: IPanelContext;
}


export const PanelContext = React.createContext(null);

export const getPanelContext = () => useContext<IPanelContext>(PanelContext);