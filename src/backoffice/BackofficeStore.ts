import {observable, computed, observe, autorun, toJS, action, runInAction, useStrict} from "mobx";
import Comm from '../lib/Comm'

declare var window;

const getComponentFromURL = (url: string): string => {
    url = url.split('?')[0].replace("#", "");
    return url.replace(/\//g, "_")
}

const initial = window.location.hash.replace("#", "") || "app/admin/dashboard";

class Store {
    @observable viewURL = initial;
    @observable viewInput = {};
    @observable viewComponentName = getComponentFromURL(initial);
    @observable isViewLoading = true;
    @observable appBaseURL = window.reactBackOfficeVar.appBaseURL;

    @observable viewServerErrors = null;
    @observable viewData = {}
    @observable viewState = {}

    //setState()


    changeView(path: string, input = {}) {
        runInAction(() => {
            this.viewInput = input;
            this.viewURL = path;
        });
    }

    loadDataForView() {
        runInAction(() => {
            console.log("loadDataForView ");

            let purePath = this.viewURL

            this.isViewLoading = true;
            this.viewServerErrors = null;
            this.viewComponentName = getComponentFromURL(this.viewURL);

            let pathQueryString = "";
            //jesli podano path w formie adresu z ? i parametrami
            if (this.viewURL.indexOf("?") != -1) {
                [purePath, pathQueryString] = this.viewURL.split("?");
            } else {
                pathQueryString = Object.keys(this.viewInput).map((i) => i + '=' + this.viewInput[i]).join('&');
            }

            window.location.hash = purePath + (pathQueryString ? "?" + pathQueryString : "");

            let comm = new Comm(this.appBaseURL + purePath + (pathQueryString ? "?" + pathQueryString : ""));
            comm.debug = false;
            comm.setData({__PROPS_REQUEST__: 1});
            comm.on(Comm.EVENTS.ERROR, (errorResponse) => {
                this.isViewLoading = false;
                this.viewServerErrors = errorResponse;

            });
            comm.on(Comm.EVENTS.SUCCESS, (data) => {
                //this.handleComponentDisplay(path, data);
                this.viewData = {
                    baseURL: getBaseURL(this.viewURL),
                    ...data
                };
                this.isViewLoading = false;

            });
            //alert("wysyłam");

            comm.send();
        });
    }


}


var store = new Store;

store.loadDataForView();


const disposer2 = observe(store, "viewURL", (change) => {
    store.loadDataForView();
});


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

