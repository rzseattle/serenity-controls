import {observable, transaction} from "mobx";

import Router from "frontend/src/backoffice/Router";
import * as qs from "qs"
import {BackOfficeColumnHelper} from "frontend/src/backoffice/BackOfficeColumnHelper";
import {BackofficeStore} from "./BackofficeStore";

declare var window;
const browserInput = window.reactBackOfficeVar;

import Comm from '../lib/Comm'

Comm.basePath = browserInput.basePath;

var store;

if (window.store) {
    store = window.store;
} else {
    window.store = store = new BackofficeStore;
    store.init();
}


Comm.errorFallback = function (data) {
    console.error("Conn error");

    store.viewServerErrors =
        "<h3>" + data.url + "</h3>"
        //+ "<pre>" + JSON.stringify(data.input, null, 2) + "</pre>"
        + data.response;
};

BackOfficeColumnHelper.goto = store.changeView;


/*const disposer2 = observe(store, "viewURL", (change) => {
    store.loadDataForView();
});*/


/*autorun(() => {
    window.store = toJS(store);
    window.storeObj = store;
})*/

const newStore = () => {
    let store = new BackofficeStore;
    store.subStore = true;
    return store;
}


export {store, newStore};



