import {autorun, observable, toJS, transaction} from "mobx";
import Comm from '../lib/Comm'
import Router from "frontend/src/backoffice/Router";


declare var window;

const browserInput = window.reactBackOfficeVar;


const getBaseURL = (url: string = null): string => {
    let baseURL = url.split('?')[0].replace("#", "");
    let tmp = baseURL.split('/')
    baseURL = tmp.slice(0, -1).join('/');
    return baseURL;
}

const getComponentFromURL = (url: string): string => {
    url = url.split('?')[0].replace("#", "");
    if (window.newRoutingRules == true) {
        return url;
    }
    url = url.replace(/\//g, "_")

    if (url[0] == "_")
        url = url.replace("_", "");
    return url;
}
let initial;
if (browserInput.path) {
    initial = browserInput.path;
} else {
    initial = window.location.hash.replace("#", "") || "/admin/dashboard";
}


class BackofficeStore {



    //input added to view request
    @observable viewInput = {};
    basePath = browserInput.basePath;

    @observable isViewLoading = true;

    @observable viewServerErrors = null;
    @observable view: any = {}
    @observable viewData: any = {}

    private onViewLoadArr = [];
    private onViewLoadedArr = [];

    init(){
        let route = window.location.pathname.replace(browserInput.basePath, "");
        this.viewData = browserInput.inputProps;
        this.view = Router.resolve(route);
    }

    changeView(path: string, input = {}) {
        transaction(() => {
            this.view = Router.resolve(path);




            this.loadDataForView(path, input);
        });
    }

    onViewLoad(callback) {
        this.onViewLoadArr.push(callback);
    }

    onViewLoaded(callback) {
        this.onViewLoadedArr.push(callback);
    }

    loadDataForView(path: string = null, input: any = null, callback: { (): any } = null) {




        console.log(path + browserInput.path);

        if (path == browserInput.path) {
            this.viewData = window.reactVariable;
            this.viewData.baseURL = browserInput.appBaseURL + getBaseURL(browserInput.path);
            this.viewData.appBaseURL = browserInput.appBaseURL;
            this.isViewLoading = false;

            this.viewComponentName = browserInput.path;
            return;
        }


        for (let i = 0; i < this.onViewLoadArr.length; i++) {
            this.onViewLoadArr[i]();
        }


        let viewInput = input || toJS(this.viewInput);
        let viewURL = path || this.viewURL;


        let purePath = viewURL

        this.isViewLoading = true;
        this.viewServerErrors = null;


        let pathQueryString = "";

        if (viewURL.indexOf("?") != -1) {
            [purePath, pathQueryString] = viewURL.split("?");
            let tmp = pathQueryString.split("&").map((inEl) => inEl.split("="));
            let tmp2 = {};
            //podmiana parametrow z inputa do urlla
            for (let i = 0; i < tmp.length; i++) {
                tmp2[tmp[i][0]] = tmp[i][1];
            }
            tmp2 = {...tmp2, ...viewInput};
            pathQueryString = Object.keys(tmp2).map((i) => i + '=' + tmp2[i]).join('&');

        } else {
            pathQueryString = Object.keys(viewInput).map((i) => i + '=' + viewInput[i]).join('&');
        }

        let url = purePath + (pathQueryString ? "?" + pathQueryString : "");
        window.location.hash = url;

        let comm = new Comm(this.appBaseURL + purePath + (pathQueryString ? "?" + pathQueryString : ""));
        comm.debug = false;
        comm.setData({__PROPS_REQUEST__: 1});
        comm.on(Comm.EVENTS.ERROR, (errorResponse) => {
            this.isViewLoading = false;
            this.viewServerErrors = errorResponse;
            for (let i = 0; i < this.onViewLoadedArr.length; i++) {
                this.onViewLoadedArr[i]();
            }

        });
        comm.on(Comm.EVENTS.SUCCESS, (data) => {
            transaction(() => {//18206
                this.viewData = {
                    ...data,
                    baseURL: this.appBaseURL + getBaseURL(viewURL),
                };
                this.viewInput = viewInput;
                this.viewURL = url;
                this.viewComponentName = getComponentFromURL(viewURL);
                this.isViewLoading = false;

            });

            if (callback != null) {
                callback();
            }

            for (let i = 0; i < this.onViewLoadedArr.length; i++) {
                this.onViewLoadedArr[i]();
            }

        });

        comm.send();

    }


}


var store = new BackofficeStore;

if (initial) {
    store.init();
    //store.loadDataForView(initial);
}


/*const disposer2 = observe(store, "viewURL", (change) => {
    store.loadDataForView();
});*/


autorun(() => {
    window.store = toJS(store);
    window.storeObj = store;

})


//useStrict(true);
export default store;

