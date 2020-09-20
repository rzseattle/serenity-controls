import * as React from "react";

import { router } from "./Router";

import "./RouteVsualization.sass";
import { IRouteElement } from "./interfaces/IRouteElement";
declare var module: any;

interface IRouteVisualizationState {
    search: string;
    filteredRoutes: any;
}

export class RouteVisualization extends React.Component<{}, IRouteVisualizationState> {
    private routing: any;

    constructor(props: {}) {
        super(props);
        this.routing = Object.entries(router.getRouting()).map(([index, el]) => ({ route: index, ...el }));
        this.state = { search: "", filteredRoutes: this.routing };
    }

    public componentDidMount() {
        router.onRoutesChanges(() => {
            this.routing = Object.entries(router.getRouting()).map(([index, el]) => ({ route: index, ...el }));

            this.setState({
                filteredRoutes: this.routing.filter(
                    (el: IRouteElement) => el.routePath.indexOf(this.state.search) != -1,
                ),
            });
        });
    }

    private handleSearchInput = (event: React.FormEvent<HTMLInputElement>) => {
        const val = (event.target as HTMLInputElement).value;
        this.setState({
            search: val,
            filteredRoutes: this.routing.filter((el: IRouteElement) => el.routePath.indexOf(val) != -1),
        });
    };

    private parseRouting() {
        let controlers = this.state.filteredRoutes.reduce(
            (p: string[], c: IRouteElement) => p.concat(c.controller),
            [],
        );

        controlers = Array.from(new Set(controlers));

        controlers = controlers.map((el: string) => {
            const tmp = el.split("\\Controllers\\");
            const apppackage = tmp[0].replace("Arrow\\", "");

            const routes = this.state.filteredRoutes.filter((route: IRouteElement) => route.controller == el);
            const file = routes[0]._debug.file; // 1234

            return {
                fullClass: el,
                file,
                shortClass: tmp[1],
                pureClass: tmp[1].split("\\").slice(-1)[0],
                namespace: el.split("\\").slice(0, -1).join("\\"),
                package: apppackage,
                routes,
            };
        });

        let namespaces = controlers.reduce((p: string[], c: IRouteElement) => p.concat(c.namespace), []);
        namespaces = Array.from(new Set(namespaces));
        namespaces = namespaces.map((namespace: string) => {
            const controllers = controlers.filter((el: IRouteElement) => el.namespace == namespace);
            return { namespace, package: controllers[0].package, controllers };
        });

        let packages = controlers.reduce((p: string[], c: any) => p.concat(c.package), []);
        packages = Array.from(new Set(packages));
        packages = packages.map((myPackage: string) => {
            const pNamespaces = namespaces.filter((el: IRouteElement) => el.package == myPackage);
            return { package: myPackage, namespaces: pNamespaces };
        });

        return packages;
    }

    public render() {
        const packages = this.parseRouting();

        return "in progress";
        /*
        return (
            <div className={"w-route-visualization"}>
                <Row noGutters={false}>
                    <BForm>
                        {() => (
                            <>
                                <BText
                                    label={"Search"}
                                    value={this.state.search}
                                    autoFocus
                                    onChange={this.handleSearchInput}
                                />
                            </>
                        )}
                    </BForm>
                </Row>

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
                                                        <a
                                                            onClick={() => ideConnector.openFile(controller.file, 1)}
                                                            className="class-title"
                                                        >
                                                            {controller.pureClass}
                                                        </a>
                                                        <div className={"routes-container"}>
                                                            {controller.routes.map(
                                                                (route: Frontend.Debug.RouteInfo) => {
                                                                    return (
                                                                        <React.Fragment key={route._routePath}>
                                                                            <div
                                                                                onClick={(e) => {
                                                                                    e.persist();
                                                                                    tooltip("", {
                                                                                        target: () => {
                                                                                            return e.target;
                                                                                        },
                                                                                        theme: "light",
                                                                                        content: () => {
                                                                                            let maxLength = 43;
                                                                                            return (
                                                                                                <>
                                                                                                    {!route._debug
                                                                                                        .componentExists &&
                                                                                                        !route._debug
                                                                                                            .templateExists && (
                                                                                                            <div>
                                                                                                                <a
                                                                                                                    className={
                                                                                                                        "btn btn-default btn-sm"
                                                                                                                    }
                                                                                                                    onClick={() =>
                                                                                                                        ideConnector.createComponent(
                                                                                                                            route
                                                                                                                                ._debug
                                                                                                                                .template +
                                                                                                                                ".component.tsx",
                                                                                                                        )
                                                                                                                    }
                                                                                                                >
                                                                                                                    <Icon
                                                                                                                        name={
                                                                                                                            "Code"
                                                                                                                        }
                                                                                                                    />
                                                                                                                    Add
                                                                                                                    component
                                                                                                                </a>
                                                                                                                <a
                                                                                                                    className={
                                                                                                                        "btn btn-default btn-sm"
                                                                                                                    }
                                                                                                                    onClick={() =>
                                                                                                                        ideConnector.createTemplate(
                                                                                                                            route
                                                                                                                                ._debug
                                                                                                                                .template +
                                                                                                                                ".phtml",
                                                                                                                        )
                                                                                                                    }
                                                                                                                >
                                                                                                                    <Icon
                                                                                                                        name={
                                                                                                                            "TVMonitor"
                                                                                                                        }
                                                                                                                    />{" "}
                                                                                                                    Add
                                                                                                                    template
                                                                                                                </a>
                                                                                                            </div>
                                                                                                        )}

                                                                                                    {route._debug
                                                                                                        .componentExists && (
                                                                                                        <>
                                                                                                            <b>
                                                                                                                <Icon
                                                                                                                    name={
                                                                                                                        "Code"
                                                                                                                    }
                                                                                                                />
                                                                                                                Component
                                                                                                            </b>

                                                                                                            <div>
                                                                                                                <a
                                                                                                                    title={
                                                                                                                        route
                                                                                                                            ._debug
                                                                                                                            .template +
                                                                                                                        ".component.tsx"
                                                                                                                    }
                                                                                                                    onClick={() =>
                                                                                                                        ideConnector.openFile(
                                                                                                                            route
                                                                                                                                ._debug
                                                                                                                                .template +
                                                                                                                                ".component.tsx",
                                                                                                                            1,
                                                                                                                        )
                                                                                                                    }
                                                                                                                >
                                                                                                                    ...
                                                                                                                    {(
                                                                                                                        route
                                                                                                                            ._debug
                                                                                                                            .template +
                                                                                                                        ".component.tsx"
                                                                                                                    ).substr(
                                                                                                                        -maxLength,
                                                                                                                        maxLength,
                                                                                                                    )}
                                                                                                                </a>
                                                                                                            </div>
                                                                                                        </>
                                                                                                    )}
                                                                                                    {route._debug
                                                                                                        .templateExists && (
                                                                                                        <>
                                                                                                            <b>
                                                                                                                <Icon
                                                                                                                    name={
                                                                                                                        "TVMonitor"
                                                                                                                    }
                                                                                                                />{" "}
                                                                                                                HTML
                                                                                                            </b>

                                                                                                            <div>
                                                                                                                <a
                                                                                                                    title={
                                                                                                                        route
                                                                                                                            ._debug
                                                                                                                            .template +
                                                                                                                        ".phtml"
                                                                                                                    }
                                                                                                                    onClick={() =>
                                                                                                                        ideConnector.openFile(
                                                                                                                            route
                                                                                                                                ._debug
                                                                                                                                .template +
                                                                                                                                ".phtml",
                                                                                                                            1,
                                                                                                                        )
                                                                                                                    }
                                                                                                                >
                                                                                                                    {(
                                                                                                                        route
                                                                                                                            ._debug
                                                                                                                            .template +
                                                                                                                        ".phtml"
                                                                                                                    ).substr(
                                                                                                                        -maxLength,
                                                                                                                        maxLength,
                                                                                                                    )}
                                                                                                                </a>
                                                                                                            </div>
                                                                                                        </>
                                                                                                    )}
                                                                                                    <b>
                                                                                                        <Icon
                                                                                                            name={
                                                                                                                "Switch"
                                                                                                            }
                                                                                                        />{" "}
                                                                                                        PHP
                                                                                                    </b>
                                                                                                    <div>
                                                                                                        <a
                                                                                                            title={
                                                                                                                controller.file +
                                                                                                                ":" +
                                                                                                                route
                                                                                                                    ._debug
                                                                                                                    .line
                                                                                                            }
                                                                                                            onClick={() =>
                                                                                                                ideConnector.openFile(
                                                                                                                    controller.file,
                                                                                                                    route
                                                                                                                        ._debug
                                                                                                                        .line,
                                                                                                                )
                                                                                                            }
                                                                                                        >
                                                                                                            ...
                                                                                                            {(
                                                                                                                controller.file +
                                                                                                                ":" +
                                                                                                                route
                                                                                                                    ._debug
                                                                                                                    .line
                                                                                                            ).substr(
                                                                                                                -maxLength,
                                                                                                                maxLength,
                                                                                                            )}
                                                                                                        </a>
                                                                                                    </div>
                                                                                                </>
                                                                                            );
                                                                                        },
                                                                                    });
                                                                                }}
                                                                            >

                                                                                <a>
                                                                                    {route._debug.templateExists && (
                                                                                        <Icon name={"TVMonitor"} />
                                                                                    )}
                                                                                    {route._debug.componentExists && (
                                                                                        <Icon name={"Code"} />
                                                                                    )}
                                                                                    {!route._debug.componentExists &&
                                                                                        !route._debug
                                                                                            .templateExists && (
                                                                                            <Icon name={"Switch"} />
                                                                                        )}
                                                                                    {" " + route._routePath}
                                                                                </a>

                                                                            </div>
                                                                        </React.Fragment>
                                                                    );
                                                                },
                                                            )}
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
        );*/
    }
}
