//declare var Views: any;
import *  as Views from "../../../../build/js/tmp/components.include.js";
import *  as ViewsRoute from "../../../../build/js/tmp/components-route.include.js";


class Router {

    public resolve(path) {

        let baseURL = path.split("/").slice(0, -1).join("/");
        let pathInfo = path;
        let Component = null;
        let extendedInfo = null;

        if (!path) {
            return false;
        }

        path = path.replace(/\//g, "_");
        path = path.replace(/\-/g, "_");

        if (path[0] == "_")
            path = path.replace("_", "");

        //szukanie w routerze budowanym ze ścieżek do lplików
        Component = this.lookAtFileRouter(path);

        /* console.log(path);
         console.log(ViewsRoute.ViewFileMap);*/

        //jeśli nie znaleziono
        if (!Component) {

            //badanie wpisów powstałych z symfony routera
            if (ViewsRoute[path]) {
                Component = ViewsRoute[path];
                extendedInfo = ViewsRoute.ViewFileMap[pathInfo];
            } else {
                //dynamic path matching
                for (let i in ViewsRoute.ViewFileMap) {
                    let el = ViewsRoute.ViewFileMap[i];
                    if (el.component && i.indexOf("{") != -1) {
                        let regexp = new RegExp(
                            "^" + i
                            // repplace all {var} to (.+?)
                                .replace(
                                    /\{.+?\}/g,
                                    "(.+?)"
                                )
                                // replace all / to _
                                .replace(
                                    /\//g,
                                    "_"
                                )
                                // replace first _ to ""
                                .replace(
                                    "_",
                                    ""
                                )
                            + "$");
                        if (path.match(regexp) !== null) {
                            let tmp = i.split("/{")[0].split("/");
                            tmp = tmp.slice(0, -1);
                            baseURL = tmp.join("/");
                            Component = ViewsRoute[el.component];
                            extendedInfo = el;
                            break;
                        }
                    } else {
                        if (path == i) {
                            let tmp = i.split("/{")[0].split("/");
                            tmp = tmp.slice(0, -1);
                            baseURL = tmp.join("/");
                            Component = ViewsRoute[el.component];
                            extendedInfo = el;
                            break;
                        }
                    }
                }
            }
        }

        if (!Component) {


            console.error("Not found:" + pathInfo);
            console.log(ViewsRoute.ViewFileMap);

            throw "Route not found";

        }

        return {
            baseURL: extendedInfo['_baseRoutePath'],
            path: pathInfo,
            Component,
            extendedInfo
        }
    }

    private lookAtFileRouter(path) {
        if (Views[path])
            return Views[path];
        if (Views["app_" + path])
            return Views["app_" + path];
    }


}

const router = new Router();

export default router;
