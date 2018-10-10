// declare var Views: any;

import RouterException from "./RouterException";

declare var PRODUCTION: any;

export interface IRouteElement {
    _controller: string;
    _method: string;
    _package: string;
    _routePath: string;
    _baseRoutePath: string;
    _debug?: {
        file: string;
        line: number;
        template: string;
        componentExists: boolean;
        templateExists: boolean;
    };
    component: string;
    index: number;
    namespace: string;
    componentObject?: React.ComponentType;
}

interface IRouteList {
    [index: string]: IRouteElement;
}

class Router {
    public routes: IRouteList = {};
    public observers: Array<() => any> = [];

    // todo zdefinowac route odp    }owiedio
    public registerRoutes(routes: IRouteList) {
        this.routes = routes;
    }

    public onRoutesChanges(callback: () => any) {
        this.observers.push(callback);
    }

    public getRouting = () => {
        return this.routes;
    };

    public async getRouteInfo(path: string): Promise<IRouteElement> {
        if (path.indexOf("?") != -1) {
            const purePath = path.split("?")[0];
            path = purePath;
        }

        try {
            const info = await this.resolve(path);
            return info;
        } catch (e) {
            throw new Error(`[RouteInfo] No info for '${path}' found`);
        }
    }

    public async resolve(path: string): Promise<IRouteElement> {
        const pathInfo = path;
        let Component = null;
        let extendedInfo = null;

        // dynamic path matching 12
        for (const i in this.routes) {
            const el = this.routes[i];
            if (i.indexOf("{") != -1) {
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
                    if (el.component) {
                        if (PRODUCTION) {
                            // todo ogarnąć typowanie asynchroniczne
                            // @ts-ignore
                            const result = await this.routes[el.namespace + "_export"]();
                            Component = result[el.index].default;
                        } else {
                            // alert(el.component);
                            Component = el.component;
                            Component = this.routes[el.component];
                        }
                    }
                    extendedInfo = el;
                    break;
                }
            } else {
                if (path == i) {
                    let tmp = i.split("/{")[0].split("/");
                    tmp = tmp.slice(0, -1);
                    if (el.component) {
                        if (PRODUCTION) {
                            // todo ogarnąć typowanie asynchroniczne
                            // @ts-ignore
                            const result = await this.routes[el.namespace + "_export"]();
                            Component = result[el.index].default;
                        } else {
                            Component = el.component;
                            // Component = this.routes[el.component];
                        }
                    }
                    extendedInfo = el;
                    break;
                }
            }
        }

        if (!extendedInfo) {
            throw new RouterException(`Route not found: '${path}'`);
        }

        if (!Component && extendedInfo) {
            // console.error("Component file not found:" + pathInfo);
            // console.error("Component file should be:" + extendedInfo._debug.template);
        }

        return {
            // @ts-ignore
            baseURL: extendedInfo._baseRoutePath,
            path: pathInfo,
            Component,
            extendedInfo,
        };
    }
}

export const router = new Router();
