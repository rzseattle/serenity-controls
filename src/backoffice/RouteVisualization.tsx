import * as React from "react";
import {Icon} from "../ctrl/Icon";
import router from "./Router";
import {TabPane, Tabs} from "../ctrl/Tabs";
import {DevProperties} from "../utils/DevProperties";

declare var DEV_PROPERIES: DevProperties;
require("./RouteVsualization.sass");

interface IMenuProps {
}

interface IMenuState {
}

export class RouteVisualization extends React.Component<IMenuProps, IMenuState> {
    private routing: any;

    constructor(props: IMenuProps) {
        super(props);
        this.state = {};
        this.routing = Object.entries(router.getRouting()).map(([index, el]) => ({route: index, ...el}));
    }

    private parseRouting() {
        let controlers = this.routing.reduce((p, c) => p.concat(c._controller), []);

        controlers = Array.from(new Set(controlers));

        controlers = controlers.map((el) => {
            const tmp = el.split("\\Controllers\\");
            const apppackage = tmp[0].replace("Arrow\\", "");

            const routes = this.routing.filter((route) => route._controller == el);
            const file = routes[0]._debug.file;

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
            return {
                namespace,
                package: controllers[0].package,
                controllers,
            };
        });

        let packages = controlers.reduce((p, c) => p.concat(c.package), []);
        packages = Array.from(new Set(packages));
        packages = packages.map((myPackage) => {
            const pNamespaces = namespaces.filter((el) => el.package == myPackage);
            return {
                package: myPackage,
                namespaces: pNamespaces,
            };
        });
        return packages;
    }

    public render() {
        const packages = this.parseRouting();

        return (
            <div className={"w-route-visualization"}>
                <Tabs>
                    <TabPane title={"Class View"}>
                        <>
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
                                                                    <a href={`phpstorm://open?url=file://${DEV_PROPERIES.project_dir}${controller.file}&line=1`} className={"class-title"}>{controller.pureClass}</a>
                                                                    <div className={"routes-container"}>
                                                                        {controller.routes.map((route) => {
                                                                            return <a key={route.route} href={`phpstorm://open?url=file://${DEV_PROPERIES.project_dir}${controller.file}&line=${route._debug.line}`} className={"route"}>{route.route}</a>;
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
                        </>
                    </TabPane>
                    <TabPane title={"List View"}>
                        <div>
                            <pre>{JSON.stringify(packages, null, 2)}</pre>
                            <pre>{JSON.stringify(this.routing, null, 2)}</pre>
                        </div>
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}
