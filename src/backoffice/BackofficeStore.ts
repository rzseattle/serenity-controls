import {observable, transaction} from "mobx";
import Comm from '../lib/Comm'
import Router from "frontend/src/backoffice/Router";
import * as qs from "qs"

declare var window;
const browserInput = window.reactBackOfficeVar;


export class BackofficeStore {


    subStore = false;
    //input added to view request
    @observable viewInput = {};
    basePath = browserInput.basePath;

    @observable isViewLoading = true;

    @observable viewServerErrors = null;
    @observable view: any = null
    @observable viewData: any = {}

    private onViewLoadArr = [];
    private onViewLoadedArr = [];


    init() {

        //this.viewData = browserInput.inputProps;
        //this.view = Router.resolve(route);
        if (window.location.hash != "#" && window.location.hash) {
            this.changeView(window.location.hash.replace("#", ""));
        } else {
            let path = window.location.pathname;
            this.changeView(path.replace(browserInput.basePath, ""));
        }

        window.addEventListener("hashchange", this.hashChangeHandler, false);

    }


    hashChangeHandler = (event) => {
        if (window.location.hash != "#") {
            console.log("Hash change - loading");
            this.changeView(window.location.hash.replace("#", ""));
        }
    }

    changeView = (path: string, input = null, callback: { (): any } = null) => {

        try {
            this.isViewLoading = true;
            this.viewServerErrors = null;

            //for just reloading props
            if (path == null) {
                if (window.location.hash != "#") {
                    path = window.location.hash.replace("#", "");
                } else {
                    let [base, query] = window.location.href.split("?");
                    path = window.location.pathname.replace(browserInput.basePath, "") + (query ? "?" + query : "")
                }
            }

            let url = "";
            let view: any;
            //check path contains query string
            if (path.indexOf("?") == -1) {
                view = Router.resolve(path);
                let query = qs.stringify(input);
                url = path + (query ? "?" + query : "");

            } else {
                let [purePath, pathQueryString] = path.split("?");
                view = Router.resolve(purePath);
                let partOfInput = qs.parse(pathQueryString);
                let query = qs.stringify(Object.assign({}, partOfInput, input));
                url = purePath + (query ? "?" + query : "");
            }


            if (!this.subStore) {
                window.removeEventListener("hashchange", this.hashChangeHandler);
                window.location.hash = url
                setTimeout(() => window.addEventListener("hashchange", this.hashChangeHandler), 20);
            }

            let comm = new Comm(url);

            comm.setData({__PROPS_REQUEST__: 1});
            comm.on(Comm.EVENTS.ERROR, (errorResponse) => {
                this.viewServerErrors = errorResponse;
                for (let i = 0; i < this.onViewLoadedArr.length; i++) {
                    this.onViewLoadedArr[i]();
                }
            });
            comm.on(Comm.EVENTS.SUCCESS, (data) => {

                transaction(() => {
                    this.viewData = data;
                    this.view = view;
                });

                for (let i = 0; i < this.onViewLoadedArr.length; i++) {
                    this.onViewLoadedArr[i]();
                }
                if (callback) {
                    callback();
                }
            });
            comm.on(Comm.EVENTS.FINISH, () => this.isViewLoading = false);
            comm.send();
        } catch (e) {
            this.viewServerErrors = "Error loading route: " + path;
            this.view = null;
            //console.log("route not fon")
        }


    }

    onViewLoad = (callback) => {
        this.onViewLoadArr.push(callback);
    }

    onViewLoaded = (callback) => {
        this.onViewLoadedArr.push(callback);
    }


}

/*const newStore = () =>{
    let store = new BackofficeStore;
    store.subStore = true;
    return store;
}*/







