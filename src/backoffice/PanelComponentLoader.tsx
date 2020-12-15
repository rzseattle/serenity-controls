import NotificationSystem from "react-notification-system";

import * as React from "react";

import { ServerErrorPresenter } from "./ServerErrorPresenter";
import { IModalProps } from "../Modal";
import { ErrorInfo } from "react";
import { PrintJSON } from "../PrintJSON";
import { IPanelContext, PanelContext } from "./PanelContext";
import { BackofficeStore } from "./BackofficeStore";
import { deepIsEqual } from "../lib";
import IBackOfficeStoreState from "./interfaces/IBackOfficeStoreState";
import { IBackOfficestoreAPI } from "./interfaces/IBackOfficestoreAPI";
import { ICommand } from "../CommandBar";

declare let PRODUCTION: boolean;
if (PRODUCTION === undefined) {
    let PRODUCTION = false;
}

export interface IArrowViewComponentProps {
    /**
     * Url without last action part
     */

    _baseURL: string;

    _basePath: string;

    /**
     * Display panel notification
     * @param {string} content Notification content
     * @param {string} title Notification title
     * @param {Object} conf Config object
     * @returns {any}
     * @private
     */
    _notification(content: string, title?: string, conf?: NotificationSystem.Notification): any;

    _reloadProps(args?: any, callback?: () => any): any;

    _setPanelOption(name: string, value: string | number | boolean, callback?: () => any): any;

    _goto(componentPath: string, args?: any, callback?: () => any): any;

    _log(element: any): any;

    _startLoadingIndicator(): any;

    _stopLoadingIndicator(): any;

    _isSub: boolean;

    _openModal(route: string, input?: any, modalProps?: Partial<IModalProps>, props?: any): string;

    _openContextMenu(coordinates: React.MouseEvent<HTMLElement, MouseEvent>, commands: ICommand[], context: any): any;

    _closeModal(modalId: string): any;

    _parentContext(): IArrowViewComponentProps;
}

interface IProps {
    context: IBackOfficeStoreState & Partial<IBackOfficestoreAPI>;
    isSub: boolean;

    onLoadStart(): any;

    onLoadEnd(): any;

    setPanelOption(name: string, value: string | number | boolean, callback?: () => any): any;

    openModal(route: string, input?: any, modalProps?: Partial<IModalProps>, props?: any): any;

    openContextMenu(event: React.MouseEvent<HTMLElement, MouseEvent>, commands: ICommand[], context: any): any;

    closeModal(modalId: string): any;

    changeView: (input: any, callback: () => any) => any;

    parentContext: IPanelContext;
}

interface IState {
    log: any[];
    hasError: boolean;
    error: any;
    devComponentFile: string;
}

export class PanelComponentLoader extends React.Component<IProps, IState> {
    public notificationSystem: NotificationSystem.System;

    constructor(props: IProps) {
        super(props);
        this.state = {
            log: [],

            hasError: false,
            error: false,
            devComponentFile: null,
        };
    }

    public componentDidCatch(error: Error, info: ErrorInfo) {
        // Display fallback UI
        /*if (!PRODUCTION) {
        }*/
        this.setState({ hasError: true, error });
        // You can also log the error to an error reporting service
        // logErrorToMyService(error, info);
    }

    public handleReloadProps = (input = {}, callback: () => any) => {
        this.props.changeView(input, callback);
    };

    public handleGoTo = (path: string, input = {}, callback: () => any = null) => {
        this.props.context.changeView(path, input, callback);
    };

    public handleNotification = (
        message: string,
        title = "",
        options: Partial<NotificationSystem.Notification> = {},
    ) => {
        const data: NotificationSystem.Notification = { title, message, ...{ level: "success", ...options } };
        this.notificationSystem.addNotification(data);
    };

    public handleLog = (message: string) => {
        this.state.log.push({ msg: message });
        this.setState(null);
    };

    public getContext: () => IPanelContext = () => {
        return {
            baseURL: this.props.context.view.baseRoutePath,
            basePath: this.props.context.basePath,
            notification: this.handleNotification,
            log: this.handleLog,
            reloadProps: this.handleReloadProps,
            setPanelOption: this.props.setPanelOption,
            goto: this.handleGoTo,
            startLoadingIndicator: this.props.onLoadStart,
            stopLoadingIndicator: this.props.onLoadEnd,
            isSub: this.props.isSub,
            openContextMenu: this.props.openContextMenu,
            scrollTo: () => {
                alert("Not implemented");
            },
            openModal: this.props.openModal,
            closeModal: this.props.closeModal,
            parentContext: this.props.parentContext,
            routeData: this.props.context.view,
        };
    };

    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        return !deepIsEqual(nextProps, this.props, true);
    }

    public render() {
        const p = this.props;
        const RouteElement = p.context.view;

        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <div>
                    <h1>Something went wrong.</h1>
                    {!PRODUCTION && <PrintJSON json={this.state.error} />}
                </div>
            );
        }

        console.log(RouteElement);

        return (
            <div className={RouteElement && RouteElement.componentName}>
                <NotificationSystem ref={(ns: any) => (this.notificationSystem = ns)} />
                {this.props.context.viewServerErrors && (
                    <ServerErrorPresenter error={this.props.context.viewServerErrors} />
                )}
                {RouteElement && RouteElement.componentObject ? (
                    <PanelContext.Provider value={this.getContext()}>
                        <RouteElement.componentObject
                            {...p.context.viewData}
                            reloadProps={this.handleReloadProps}
                            baseURL={p.context.view.baseRoutePath}
                            _baseURL={p.context.view.baseRoutePath}
                            _basePath={p.context.basePath}
                            _notification={this.handleNotification}
                            _log={this.handleLog}
                            _reloadProps={this.handleReloadProps}
                            _setPanelOption={this.props.setPanelOption}
                            _goto={this.handleGoTo}
                            _startLoadingIndicator={this.props.onLoadStart}
                            _stopLoadingIndicator={this.props.onLoadEnd}
                            _isSub={this.props.isSub}
                            _scrollTo={() => {
                                alert("Not implemented");
                            }}
                            _openModal={this.props.openModal}
                            _openContextMenu={this.props.openContextMenu}
                            _closeModal={this.props.closeModal}
                            // @ts-ignore //todo sprawdzić dlaczego
                            _parentContext={this.props.parentContext}
                        />
                    </PanelContext.Provider>
                ) : (
                    !this.props.context.isViewLoading &&
                    ((this.props.context.viewServerErrors &&
                        this.props.context.viewServerErrors.__arrowException === undefined) ||
                        !this.props.context.viewServerErrors) && (
                        <div style={{ padding: 20 }}>
                            <h1>404 not found</h1>
                            <div>Selected resource cannot be found</div>
                        </div>
                    )
                )}
                {RouteElement && RouteElement.componentObject == null && (
                    <div style={{ padding: 10 }}>
                        <h3>Can't find component </h3>
                        <pre>{JSON.stringify(RouteElement, null, 2)}</pre>
                    </div>
                )}
            </div>
        );
    }
}
