//declare var Views: any;
import *  as ViewsRoute from "../../../../build/js/tmp/components-route.include.js";


class Router {

    public resolve(path) {


        let pathInfo = path;
        let Component = null;
        let extendedInfo = null;

        if (!path) {
            return false;
        }


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
                            "\/"
                        )
                    + "$");
                if (path.match(regexp) !== null) {
                    let tmp = i.split("/{")[0].split("/");
                    tmp = tmp.slice(0, -1);
                    Component = ViewsRoute[el.component];
                    extendedInfo = el;
                    break;
                }
            } else {
                if (path == i) {
                    let tmp = i.split("/{")[0].split("/");
                    tmp = tmp.slice(0, -1);
                    Component = ViewsRoute[el.component];
                    extendedInfo = el;
                    break;
                }
            }
        }

        if (!Component) {


            if (extendedInfo) {
                console.error("Component file not found:" + pathInfo);
                console.error("Component file should be:" + extendedInfo._debug.template);
                /*console.error("Additional info");
                console.log(extendedInfo);*/
            } else {
                console.error("Route not fount: " + pathInfo);
                console.log(ViewsRoute.ViewFileMap);
            }


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
