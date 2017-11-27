import {observable, observe, autorun, toJS, action, runInAction, useStrict, transaction} from "mobx";
import Comm from '../lib/Comm'

declare var window;

const getComponentFromURL = (url: string): string => {
    url = url.split('?')[0].replace("#", "");
    url = url.replace(/\//g, "_")

    //old versions ( raporty ) hack
    if (url[0] == "_")
        url = "app" + url;
    return url;
}

const initial = window.location.hash.replace("#", "") || "app/admin/dashboard";

class Store {
    //url path from browser
    @observable viewURL = null;
    //input added to view request
    @observable viewInput = {};
    @observable viewComponentName = null;
    @observable isViewLoading = true;
    @observable appBaseURL = window.reactBackOfficeVar.appBaseURL;

    @observable viewServerErrors = null;
    @observable viewData = {}
    @observable viewState = {}

    //setState()


    changeView(path: string, input = {}) {
        transaction(() => {

            this.loadDataForView(path, input);
        });
    }

    loadDataForView(path: string = null, input: any = null, callback: { (): any } = null) {


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
        });
        comm.on(Comm.EVENTS.SUCCESS, (data) => {
            transaction(() => {//18206
                this.viewData = {
                    ...data,
                    baseURL: getBaseURL(viewURL),
                };
                this.viewInput = viewInput;
                this.viewURL = url;
                this.viewComponentName = getComponentFromURL(viewURL);
                this.isViewLoading = false;

            });

            if (callback != null) {
                callback();
            }

        });

        comm.send();

    }


}


var store = new Store;

//store.loadDataForView(initial);


/*const disposer2 = observe(store, "viewURL", (change) => {
    store.loadDataForView();
});*/


autorun(() => {
    window.store = toJS(store);
    window.storeObj = store;

})


const getBaseURL = (url: string = null): string => {
    let baseURL = url.split('?')[0].replace("#", "");
    let tmp = baseURL.split('/')
    baseURL = tmp.slice(0, -1).join('/');
    return baseURL;
}

//useStrict(true);
export default store;

