// @ts-ignore
import * as qs from "qs";
import { Comm, CommEvents } from "../lib";
import { router } from "./Router";
import { IRouteElement } from "./interfaces/IRouteElement";
import IBackOfficeStoreState from "./interfaces/IBackOfficeStoreState";
import { IBackOfficestoreAPI } from "./interfaces/IBackOfficestoreAPI";

declare let window: any;
declare let module: any;

export interface IDebugDataEntry {
    response: any;
    input: any;
    url: string;
    routeInfo: IRouteElement;
    requestType: "view" | "ajax";
    time: Date;
}

export type DebugDataListener = (data: IDebugDataEntry[]) => any;

const externalInput: object = window.reactBackOfficeVar !== undefined ? window.reactBackOfficeVar : {};
const browserInput = { basePath: "/", user: { login: "test@login.com", isDev: true }, ...externalInput };

class BackofficeStore implements IBackOfficestoreAPI {
    public static debugLog: IDebugDataEntry[] = [];

    public static debugDataListeners: DebugDataListener[] = [];
    public static debugViewAjaxInProgress = true;
    public static registerDebugDataListener = (listener: DebugDataListener) => {
        BackofficeStore.debugDataListeners.push(listener);
    };

    public static debugDataChanged() {
        for (const listener of BackofficeStore.debugDataListeners) {
            listener(this.debugLog);
        }
    }

    public static cleanUpDebugData() {
        BackofficeStore.debugLog = [];
        BackofficeStore.debugDataChanged();
    }

    public static registerDebugData(
        type: "view" | "ajax",
        url: string,
        routeElement: IRouteElement,
        response: any,
        input: any,
    ) {
        BackofficeStore.debugLog.push({
            url: url,
            response: response,
            routeInfo: routeElement,
            requestType: type,
            time: new Date(),
            input: input ? input : {},
        });

        if (BackofficeStore.debugLog.length > 10) {
            BackofficeStore.debugLog = BackofficeStore.debugLog.slice(-10);
        }
        BackofficeStore.debugDataChanged();
    }

    public dataUpdateCb: () => any;

    public subStore = false;
    // input added to view request
    public viewInput = {};
    public basePath = browserInput.basePath;

    public isViewLoading = true;
    public isPackageCompiling = false;

    public viewServerErrors: any = null;
    public view: IRouteElement = null;
    public viewData: any = {};
    public externalViewData: any = {};

    private onViewLoadArr: Array<() => any> = [];
    private onViewLoadedArr: Array<() => any> = [];

    public initRootElement() {
        if (window.location.hash != "#" && window.location.hash) {
            this.changeView(window.location.hash.replace("#", ""));
        } else {
            const path = window.location.pathname;
            this.changeView(path.replace(browserInput.basePath, ""));
        }
        window.addEventListener("hashchange", this.hashChangeHandler, false);

        Comm.errorFallback = (error) => {
            this.viewServerErrors = error;
            this.dataUpdated();
        };

        Comm.onFinish.push((url, input, response, method) => {
            if (!BackofficeStore.debugViewAjaxInProgress) {
                router.getRouteInfo(url).then((routeInfo) => {
                    if (this.view.componentName == routeInfo.componentName) {
                        BackofficeStore.registerDebugData("view", url, routeInfo, response, input);
                    } else {
                        BackofficeStore.registerDebugData("ajax", url, routeInfo, response, input);
                    }
                });
            }
        });

        if (module.hot) {
            module.hot.addStatusHandler((status: string) => {
                if (status == "check") {
                    this.isPackageCompiling = true;
                    this.dataUpdated();
                } else if (status == "idle") {
                    this.isPackageCompiling = false;
                    this.dataUpdated();
                }
            });
        }
    }

    public getState(): IBackOfficeStoreState {
        return {
            basePath: this.basePath,
            viewInput: this.viewInput,
            view: this.view,
            viewData: this.viewData,
            viewServerErrors: this.viewServerErrors,
            isViewLoading: this.isViewLoading,
            isPackageCompiling: this.isPackageCompiling,
        };
    }

    public onDataUpdated(cb: () => any) {
        this.dataUpdateCb = cb;
    }

    public dataUpdated() {
        if (this.dataUpdateCb !== undefined) {
            this.dataUpdateCb();
        }
    }

    public hashChangeHandler = () => {
        if (window.location.hash != "#") {
            this.changeView(window.location.hash.replace("#", ""));
        }
    };

    private currentPath = "";
    public changeView = async (path: string, input: any = null, callback: () => any = null) => {
        const originalPath = path;

        try {
            this.isViewLoading = true;
            this.viewServerErrors = null;

            // for just reloading props
            if (path == null) {
                if (!this.subStore) {
                    if (window.location.hash != "#") {
                        path = window.location.hash.replace("#", "");
                    } else {
                        const [base, query] = window.location.href.split("?");
                        path = window.location.pathname.replace(browserInput.basePath, "") + (query ? "?" + query : "");
                    }
                } else {
                    path = this.currentPath;
                }
            }
            this.currentPath = path;

            let url = "";
            let view: any;
            // check path contains query string
            if (path.indexOf("?") == -1) {
                view = await router.resolve(path);
                const query = qs.stringify(input);
                url = path + (query ? "?" + query : "");
            } else {
                const [purePath, pathQueryString] = path.split("?");
                view = await router.resolve(purePath);
                const partOfInput = qs.parse(pathQueryString);
                const query = qs.stringify(Object.assign({}, partOfInput, input));
                url = purePath + (query ? "?" + query : "");
            }
            const resolvedView = view;

            if (!this.subStore) {
                window.removeEventListener("hashchange", this.hashChangeHandler);
                window.location.hash = url;
                setTimeout(() => window.addEventListener("hashchange", this.hashChangeHandler), 20);
            }

            const comm = new Comm(url);

            comm.setData({ __PROPS_REQUEST__: 1 });
            comm.on(CommEvents.ERROR, (errorResponse) => {
                this.viewServerErrors = errorResponse;
                for (const el of this.onViewLoadedArr) {
                    el();
                }
            });
            comm.on(CommEvents.SUCCESS, (data) => {
                if (data.__arrowException !== undefined) {
                    this.viewServerErrors = data;
                    this.isViewLoading = false;
                    return;
                }

                this.viewData = Object.assign({}, data, this.externalViewData);
                this.view = resolvedView;

                for (const el of this.onViewLoadedArr) {
                    el();
                }
                if (callback) {
                    callback();
                }

                if (originalPath) {
                    try {
                        router.getRouteInfo(originalPath).then((routeData: IRouteElement) => {
                            /*BackofficeStore.registerDebugData(
                                    "view",
                                    originalPath,
                                    routeData,
                                    this.viewData,
                                    input,
                                );*/
                        });
                    } catch (e) {
                        throw new Error("Smth is wrong " + originalPath + ", " + e);
                    }
                }
            });
            comm.on(CommEvents.FINISH, () => {
                this.isViewLoading = false;
                this.dataUpdated();
            });

            BackofficeStore.debugViewAjaxInProgress = true;
            comm.send();
            BackofficeStore.debugViewAjaxInProgress = false;
        } catch (e) {
            this.viewServerErrors = e;
            this.view = null;
            this.isViewLoading = false;
            this.dataUpdated();
        }
    };

    public onViewLoad = (callback: () => any) => {
        this.onViewLoadArr.push(callback);
    };

    public onViewLoaded = (callback: () => any) => {
        this.onViewLoadedArr.push(callback);
    };
}

export { BackofficeStore };
