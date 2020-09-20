// declare var Views: any;

import RouterException from "./RouterException";

import { IRouteElement } from "./interfaces/IRouteElement";
import { IRouteList } from "./interfaces/IRouteList";
import { IArrowViewComponentProps } from "./PanelComponentLoader";

declare let PRODUCTION: any;

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
        let entryFromInput = null;
        // dynamic path matching 12
        for (const i in this.routes) {
            const el = this.routes[i];
            const test = el.routePath;
            if (test.indexOf("{") != -1) {
                const regexp = new RegExp(
                    "^" +
                        test
                            // repplace all {var} to (.+?)
                            .replace(/\{.+?\}/g, "(.+?)")
                            // replace all / to _
                            .replace(/\//g, "/") +
                        "$",
                );
                if (path.match(regexp) !== null) {
                    let tmp = test.split("/{")[0].split("/");
                    tmp = tmp.slice(0, -1);

                    entryFromInput = el;
                    break;
                }
            } else {
                if (path == test) {
                    let tmp = test.split("/{")[0].split("/");
                    tmp = tmp.slice(0, -1);

                    entryFromInput = el;
                    break;
                }
            }
        }
        if (!entryFromInput) {
            throw new RouterException(`Route not found: '${path}'`);
        }
        return this.translateInputRoute(entryFromInput);
    }

    private async translateInputRoute(input: any): Promise<IRouteElement> {
        const Component: React.ComponentType<IArrowViewComponentProps> = await this.componentFromInput(input);

        //input from generated tmp/components-route.include.js
        return {
            controller: input.controller,
            method: input.method,
            package: input.package,
            routePath: input.routePath,
            baseRoutePath: input.baseRoutePath,
            componentName: input.componentName,
            componentObject: Component,
            index: input.index,
            namespace: input.namespace,
            _debug: {
                file: input._debug.file,
                line: input._debug.line,
                template: input._debug.template,
                componentExists: input._debug.componentExists,
                templateExists: input._debug.templateExists,
            },
        };
    }

    private async componentFromInput(input: any): Promise<React.ComponentType<IArrowViewComponentProps>> {
        if (input.component) {
            if (PRODUCTION && false) {
                // todo ogarnąć typowanie asynchroniczne
                // @ts-ignore
                const result = await this.routes[el.namespace + "_export"]();
                return result[input.index].default;
            } else {
                return input.component;
                //Component = this.routes[el.component];
            }
        }
        return null;
    }
}

export const router = new Router();
