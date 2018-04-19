import * as React from "react";
import {Icon} from "../ctrl/Icon";
import router from "../backoffice/Router";

import {BForm, BText} from "../layout/BootstrapForm";
import {ideConnector} from "./IDEConnector";

require("./RouteVsualization.sass");
declare var module: any;

interface IRouteVisualizationProps {
}

interface IRouteVisualizationState {
    search: string;
    filteredRoutes: any;
}

export class RouteVisualization extends React.Component<IRouteVisualizationProps, IRouteVisualizationState> {
    private routing: any;

    constructor(props: IRouteVisualizationProps) {
        super(props);
        this.routing = Object.entries(router.getRouting()).map(([index, el]) => ({route: index, ...el}));
        this.state = {search: "", filteredRoutes: this.routing};
    }

    public componentDidMount() {
        router.onRoutesChanges(() => {
            this.routing = Object.entries(router.getRouting()).map(([index, el]) => ({route: index, ...el}));

            this.setState({filteredRoutes: this.routing});
        });
    }

    private handleSearchInput = (event) => {
        this.setState({search: event.value, filteredRoutes: this.routing.filter((el) => el.route.indexOf(event.value) != -1)});
    };

    private parseRouting() {
        let controlers = this.state.filteredRoutes.reduce((p, c) => p.concat(c._controller), []);

        controlers = Array.from(new Set(controlers));

        controlers = controlers.map((el) => {
            const tmp = el.split("\\Controllers\\");
            const apppackage = tmp[0].replace("Arrow\\", "");

            const routes = this.state.filteredRoutes.filter((route) => route._controller == el);
            const file = routes[0]._debug.file; //1234

            return {
                fullClass: el,
                file,
                shortClass: tmp[1],
                pureClass: tmp[1].split("\\").slice(-1)[0],
                namespace: el
                    .split("\\")
                    .slice(0, -1)
                    .join("\\"),
                package: apppackage,
                routes,
            };
        });

        let namespaces = controlers.reduce((p, c) => p.concat(c.namespace), []);
        namespaces = Array.from(new Set(namespaces));
        namespaces = namespaces.map((namespace) => {
            const controllers = controlers.filter((el) => el.namespace == namespace);
            return {namespace, package: controllers[0].package, controllers};
        });

        let packages = controlers.reduce((p, c) => p.concat(c.package), []);
        packages = Array.from(new Set(packages));
        packages = packages.map((myPackage) => {
            const pNamespaces = namespaces.filter((el) => el.package == myPackage);
            return {package: myPackage, namespaces: pNamespaces};
        });

        return packages;
    }

    public render() {
        const packages = this.parseRouting();

        return (
            <div className={"w-route-visualization"}>
                <div>
                    <BForm>
                        {() => (
                            <>
                                <BText value={this.state.search} onChange={this.handleSearchInput}/>
                            </>
                        )}
                    </BForm>
                </div>

                {packages.map((myPackage) => {
                    return (
                        <div key={myPackage.package} className={"package-container"}>
                            <div className={"package-title"}>{myPackage.package}</div>

                            {myPackage.namespaces.map((namespace) => {
                                return (
                                    <div key={namespace.namespace} className={"namespace-container"}>
                                        <div className={"namespace-title"}>{namespace.namespace}</div>

                                        <div className={"class-container"}>
                                            {namespace.controllers.map((controller) => {
                                                return (
                                                    <div className={"class"} key={controller.pureClass}>

                                                        <a onClick={() => ideConnector.openFile(controller.file, 1)} className="class-title">
                                                            {controller.pureClass}
                                                        </a>
                                                        <div className={"routes-container"}>
                                                            {controller.routes.map((route) => {
                                                                return (
                                                                    <React.Fragment key={route.route}>
                                                                        <a
                                                                            onClick={() => ideConnector.openFile(controller.file, route._debug.line)}
                                                                            className={"route"}
                                                                        >
                                                                            <Icon name={route._debug.templateExists ? "TVMonitor" : "Switch"}/> {route.route}
                                                                        </a>
                                                                        <div onClick={() => ideConnector.openFile(controller.template, 1)} style={{fontSize: 10, color: "grey"}}>{route._debug.template}</div>
                                                                    </React.Fragment>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        );
    }
}
