import * as React from "react";

import {IModalProps} from "../Modal";
import * as NotificationSystem from "react-notification-system";
import {IArrowViewComponentProps} from "./PanelComponentLoader";

export const PanelContext = React.createContext<IArrowViewComponentProps>({
    _basePath: "", _baseURL: "", _isSub: false,
    _closeModal(modalId: string): any {},
    _goto(componentPath: string, args?: any, callback?: () => any): any {},
    _log(element: any): any {},
    _notification(content: string, title?: string, conf?: NotificationSystem.Notification): any {},
    _openModal(route: string, input?: any, modalProps?: Partial<IModalProps>, props?: any): string { return "";},
    _reloadProps(args?: any, callback?: () => any): any {},
    _setPanelOption(name: string, value: string | number | boolean, callback?: () => any): any {},
    _startLoadingIndicator(): any {},
    _stopLoadingIndicator(): any {}
});