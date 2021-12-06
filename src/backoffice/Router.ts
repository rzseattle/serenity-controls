// declare var Views: any;

import RouterException from "./RouterException";

import { IRouteElement } from "./interfaces/IRouteElement";
import { IRouteList } from "./interfaces/IRouteList";
import { IArrowViewComponentProps } from "./PanelComponentLoader";

class Router {
    get defaultView(): string {
        return this._defaultView;
    }
    public routes: IRouteList = {};
    public observers: Array<() => any> = [];

    // todo zdefinowac route odp    }owiedio
    private _defaultView: string;

    public registerRoutes(routes: IRouteList) {
        this.routes = routes;
    }

    public registerDefaultView(path: string) {
        this._defaultView = path;
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

            const regexp = new RegExp(
                "^" +
                    test
                        // repplace all {var} to (.+?)
                        .replace(/\{.+?\}/g, "(.+?)")
                        .replace(/\*/g, "(.*?)")
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
        }
        if (!entryFromInput) {
            throw new RouterException(`Route not found: '${path}'`);
        }
        return this.translateInputRoute(entryFromInput, path);
    }

    private async translateInputRoute(input: any, path: string): Promise<IRouteElement> {
        const Component: React.ComponentType<IArrowViewComponentProps> = await this.componentFromInput(input);
        //input from generated tmp/components-route.include.js
        return {
            path,
            controller: input.controller,
            method: input.method,
            package: input.package,
            routePath: input.routePath,
            baseRoutePath: input.baseRoutePath,
            componentName: input.componentName,
            componentObject: input.componentObject !== null ? input.componentObject : Component,
            index: input.index,
            namespace: input.namespace,
            useAutoRequest: input.useAutoRequest,
            _debug: {
                file: input._debug?.file,
                line: input._debug?.line,
                template: input._debug?.template,
                componentExists: input._debug?.componentExists,
                templateExists: input._debug?.templateExists,
            },
        };
    }

    private async componentFromInput(input: any): Promise<React.ComponentType<IArrowViewComponentProps>> {
        if (input.component) {
            return input.component;
            //Component = this.routes[el.component];
        }
        return null;
    }
}

export const router = new Router();
