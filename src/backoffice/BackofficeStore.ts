// @ts-ignore
import * as qs from "qs";
import { Comm, CommEvents } from "../lib";
import {  router } from "./Router";
import { IRouteElement } from "./interfaces/IRouteElement";

declare var window: any;
declare var module: any;

export interface IDebugDataEntry {
    route: string;
    props: any[];
    urls: any[];
    instances: number;
    routeInfo: IRouteElement;
}

export type DebugDataListener = (
    data: {
        views: IDebugDataEntry[];
        ajax: IDebugDataEntry[];
    },
) => any;

const browserInput = window.reactBackOfficeVar;

class BackofficeStore {
    public static debugData: {
        views: IDebugDataEntry[];
        ajax: IDebugDataEntry[];
    } = {
        views: [],
        ajax: [],
    };
    public static debugDataListeners: DebugDataListener[] = [];
    public static debugViewAjaxInProgress = true;
    public static registerDebugDataListener = (listener: DebugDataListener) => {
        BackofficeStore.debugDataListeners.push(listener);
    };

    public static debugDataChanged() {
        for (const listener of BackofficeStore.debugDataListeners) {
            listener(this.debugData);
        }
    }

    public static registerDebugData(type: "views" | "ajax", url: string, routeElement: IRouteElement, props: any) {
        if (type == "ajax") {
            for (let index = 0; index < BackofficeStore.debugData.ajax.length; index++) {
                const entry = BackofficeStore.debugData.ajax[index];
                if (entry.route == routeElement._routePath) {
                    BackofficeStore.debugData.ajax.splice(index, 1);
                }
            }

            BackofficeStore.debugData[type].push({
                urls: [url],
                props: [props],
                route: routeElement._routePath,
                routeInfo: routeElement,
                instances: 1,
            });
            if (BackofficeStore.debugData[type].length > 10) {
                BackofficeStore.debugData[type] = BackofficeStore.debugData[type].slice(-10);
            }
        } else {
            let exists = false;
            for (const entry of BackofficeStore.debugData[type]) {
                if (entry.route == routeElement._routePath) {
                    exists = true;
                    entry.urls.push(url);
                    entry.props.push(props);
                    entry.instances++;
                }
            }
            if (!exists) {
                BackofficeStore.debugData[type].push({
                    urls: [url],
                    props: [props],
                    route: routeElement._routePath,
                    routeInfo: routeElement,
                    instances: 1,
                });
            }
        }

        BackofficeStore.debugDataChanged();
    }

    public static unregisterDebugData(url: string) {
        for (let index = 0; index < BackofficeStore.debugData.views.length; index++) {
            const entry = BackofficeStore.debugData.views[index];
            for (let i = entry.urls.length - 1; i >= 0; i--) {
                if (entry.urls[i] == url) {
                    entry.instances--;
                    if (entry.instances == 0) {
                        BackofficeStore.debugData.views.splice(index as number, 1);
                        break;
                    }

                    entry.urls.splice(i, 1);
                    entry.props.splice(i, 1);
                }
            }
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
    public view: any = null;
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

        Comm.onStart.push((url, data, method) => {
            if (!BackofficeStore.debugViewAjaxInProgress) {
                const routeData = router.getRouteInfo(url);
                if (routeData !== null) {
                    router.getRouteInfo(url).then((result) => {
                        BackofficeStore.registerDebugData("ajax", url, result, data);
                    });
                }
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

    public getState() {
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
    public changeView = (path: string, input: any = null, callback: () => any = null) => {
        const originalPath = path;
        //console.log(this.currentPath + " => " + path);

        if(path && false) {
            // tutaj trzeba poradzić sobie ze śledzeniem odpalonych widoków
            console.log(this.currentPath , "wywalam");
            BackofficeStore.unregisterDebugData(this.currentPath);
        }

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
                view = router.resolve(path);
                const query = qs.stringify(input);
                url = path + (query ? "?" + query : "");
            } else {
                const [purePath, pathQueryString] = path.split("?");
                view = router.resolve(purePath);
                const partOfInput = qs.parse(pathQueryString);
                const query = qs.stringify(Object.assign({}, partOfInput, input));
                url = purePath + (query ? "?" + query : "");
            }

            view.then((resolvedView: any) => {
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
                                BackofficeStore.registerDebugData("views", originalPath, routeData, this.viewData);
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
            });
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
