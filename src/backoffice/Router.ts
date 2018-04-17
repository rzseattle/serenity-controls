//declare var Views: any;
import * as ViewsRoute from "../../../../build/js/tmp/components-route.include.js";
import RouterException from "./RouterException";

class Router {
    public getRouting = () => {
        return ViewsRoute.ViewFileMap;
    };

    public resolve = (path) => {
        const pathInfo = path;
        let Component = null;
        let extendedInfo = null;

        if (!path) {
            return false;
        }

        //dynamic path matching
        for (const i in ViewsRoute.ViewFileMap) {
            const el = ViewsRoute.ViewFileMap[i];
            if (el.component && i.indexOf("{") != -1) {
                const regexp = new RegExp(
                    "^" +
                    i
                    // repplace all {var} to (.+?)
                        .replace(/\{.+?\}/g, "(.+?)")
                        // replace all / to _
                        .replace(/\//g, "/") +
                    "$",
                );
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


            throw new RouterException("Route not found :" + path);
        }

        return {
            baseURL: extendedInfo._baseRoutePath,
            path: pathInfo,
            Component,
            extendedInfo,
        };
    };
}

const router = new Router();

export default router;
