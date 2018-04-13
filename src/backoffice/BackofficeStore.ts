import Comm from "../lib/Comm";
import Router from "frontend/src/backoffice/Router";
import * as qs from "qs";

declare var window;
const browserInput = window.reactBackOfficeVar;

export class BackofficeStore {
    public dataUpdateCb: () => any;

    public getState() {
        return {
            basePath: this.basePath,
            viewInput: this.viewInput,
            view: this.view,
            viewData: this.viewData,
            viewServerErrors: this.viewServerErrors,
            isViewLoading: this.isViewLoading,
        };
    }

    public onDataUpdated(cb) {
        this.dataUpdateCb = cb;
    }

    public dataUpdated() {
        if (this.dataUpdateCb !== undefined) {
            this.dataUpdateCb();
        }
    }

    public subStore = false;
    // input added to view request
    public viewInput = {};
    public basePath = browserInput.basePath;

    public isViewLoading = true;

    public viewServerErrors = null;
    public view: any = null;
    public viewData: any = {};
    public externalViewData: any = {};

    private onViewLoadArr = [];
    private onViewLoadedArr = [];

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
    }

    public hashChangeHandler = () => {
        if (window.location.hash != "#") {
            this.changeView(window.location.hash.replace("#", ""));
        }
    };

    public changeView = (path: string, input = null, callback: () => any = null) => {
        try {
            this.isViewLoading = true;
            this.viewServerErrors = null;

            // for just reloading props
            if (path == null) {
                if (window.location.hash != "#") {
                    path = window.location.hash.replace("#", "");
                } else {
                    const [base, query] = window.location.href.split("?");
                    path = window.location.pathname.replace(browserInput.basePath, "") + (query ? "?" + query : "");
                }
            }

            let url = "";
            let view: any;
            // check path contains query string
            if (path.indexOf("?") == -1) {
                view = Router.resolve(path);
                const query = qs.stringify(input);
                url = path + (query ? "?" + query : "");
            } else {
                const [purePath, pathQueryString] = path.split("?");
                view = Router.resolve(purePath);
                const partOfInput = qs.parse(pathQueryString);
                const query = qs.stringify(Object.assign({}, partOfInput, input));
                url = purePath + (query ? "?" + query : "");
            }

            if (!this.subStore) {
                window.removeEventListener("hashchange", this.hashChangeHandler);
                window.location.hash = url;
                setTimeout(() => window.addEventListener("hashchange", this.hashChangeHandler), 20);
            }

            const comm = new Comm(url);

            comm.setData({ __PROPS_REQUEST__: 1 });
            comm.on(Comm.EVENTS.ERROR, (errorResponse) => {
                this.viewServerErrors = errorResponse;

                for (const el of this.onViewLoadedArr) {
                    el();
                }
            });
            comm.on(Comm.EVENTS.SUCCESS, (data) => {
                this.viewData = Object.assign({}, data, this.externalViewData);
                this.view = view;

                for (const el of this.onViewLoadedArr) {
                    el();
                }
                if (callback) {
                    callback();
                }
            });
            comm.on(Comm.EVENTS.FINISH, () => {
                this.isViewLoading = false;
                this.dataUpdated();
            });
            comm.send();
        } catch (e) {
            this.viewServerErrors = "Error loading route: " + path;
            this.view = null;
            this.dataUpdated();
        }
    };

    public onViewLoad = (callback) => {
        this.onViewLoadArr.push(callback);
    };

    public onViewLoaded = (callback) => {
        this.onViewLoadedArr.push(callback);
    };
}
