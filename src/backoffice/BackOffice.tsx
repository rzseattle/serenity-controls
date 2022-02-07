import * as React from "react";

import { IMenuElement, IMenuSection, Menu } from "./Menu";

// @ts-ignore
import * as NProgress from "nprogress/nprogress.js";
import "nprogress/nprogress.css";

import { Modal } from "../Modal";

import { fI18n } from "../lib";

import { PanelComponentLoader } from "./PanelComponentLoader";
import { configGetAll } from "./Config";
import { IPanelContext } from "./PanelContext";
import { ICommand } from "../CommandBar";
import "./BackOfficePanel.sass";

import { HotKeys } from "../HotKeys";
import { Key } from "ts-key-enum";

import { CommonIcons } from "../lib/CommonIcons";

NProgress.configure({ parent: ".w-panel-body" });

interface IBackOfficePanelProps {
    icon?: any;
    onlyBody?: boolean;
    isSub?: boolean;
    title?: string;
    user?: any;
    menu?: IMenuSection[];
    parentContext?: IPanelContext;
    topActions?: ICommand[];
    onMenuClick: (element: IMenuElement, inWindow: boolean) => any;
    logout: () => any;
}

interface IBackOfficePanelState {
    currentView: string;
    userMenuVisible: boolean;
    menuVisible: boolean;
    layout: "mobile" | "normal" | "large";
    loading: boolean;
    onlyBody: boolean;
    navigationWindowOpened: boolean;
}

export class BackOffice extends React.Component<IBackOfficePanelProps, IBackOfficePanelState> {
    public container: HTMLDivElement;
    private panelLoader = React.createRef<PanelComponentLoader>();

    private callbacks: { onceAfterUpdate: (() => any)[] } = {
        onceAfterUpdate: [],
    };

    public static defaultProps: Partial<IBackOfficePanelProps> = {
        onlyBody: false,
        isSub: false,
        parentContext: null,
        topActions: [],
    };

    constructor(props: IBackOfficePanelProps) {
        super(props);

        this.state = {
            currentView: null,
            userMenuVisible: false,
            menuVisible: true,
            layout: "normal",
            loading: false,
            onlyBody: this.props.onlyBody,

            navigationWindowOpened: false,
        };

        //Comm.onStart.push(this.handleLoadStart);
        //Comm.onFinish.push(this.handleLoadEnd);
    }

    public adjustToSize() {
        if (this.container) {
            this.container.style.height = "100%";
            //(this.container.parentElement as HTMLElement).getBoundingClientRect().height + "px";
        }
        if (window.innerWidth <= 479 && this.state.layout != "mobile") {
            this.setState({ layout: "mobile", menuVisible: false });
        } else if (window.innerWidth > 479 && this.state.layout != "normal") {
            this.setState({ layout: "normal", menuVisible: true });
        }
    }

    public handleAppIconClicked = () => {
        if (this.state.layout != "mobile") {
            alert("home cliccked");
        } else {
            this.setState({ menuVisible: !this.state.menuVisible });
        }
    };

    public handleNavigateTo = (element: IMenuElement, inWindow = false) => {
        this.props.onMenuClick(element, inWindow);
    };

    public getContext = () => {
        return this.panelLoader.current.getContext();
    };

    public componentDidMount() {
        this.adjustToSize();
        let timeout: any = null;
        window.addEventListener("resize", () => {
            clearTimeout(timeout);
            timeout = setTimeout(this.adjustToSize.bind(this), 30);
        });
    }

    public componentDidUpdate() {
        for (const callback of this.callbacks.onceAfterUpdate) {
            callback();
        }
        this.callbacks.onceAfterUpdate = [];
    }

    public handleChangeView = () => {
        this.handleLoadStart();
    };

    public handleLoadStart = () => {
        NProgress.start();
    };

    public handleLoadEnd = () => {
        NProgress.done();
    };

    public handleSetPanelOption = (name: string, value: any, callback: () => any) => {
        const obj: any = {};
        obj[name] = value;
        this.setState(obj, callback);
    };

    private beforeMenuFocusedElement: Element = null;
    private toggleLayerMenu = () => {
        if (!this.state.navigationWindowOpened) {
            this.beforeMenuFocusedElement = document.activeElement;
        }
        this.setState({ navigationWindowOpened: !this.state.navigationWindowOpened }, () => {
            if (!this.state.navigationWindowOpened) {
                if (this.beforeMenuFocusedElement) {
                    // @ts-ignore
                    this.beforeMenuFocusedElement.focus();
                }
            }
        });
    };

    public render() {
        const languages = configGetAll().translations.languages;
        const { topActions } = this.props;

        return (
            <div className="w-panel-container w-backoffice-panel" ref={(container) => (this.container = container)}>
                <HotKeys
                    actions={[
                        { key: Key.Escape, handler: this.toggleLayerMenu },
                        { key: [Key.ArrowLeft, Key.Control], handler: () => window.history.back() },
                        { key: [Key.ArrowRight, Key.Control], handler: () => window.history.forward() },
                    ]}
                    observeFromInput={[Key.Escape]}
                    root={true}
                    name={"Root Backoffice"}
                >
                    {!this.state.onlyBody && (
                        <div className="w-panel-top">
                            <div className="app-icon" onClick={this.handleAppIconClicked}>
                                {this.state.layout != "mobile" ? <this.props.icon /> : <CommonIcons.list />}
                            </div>
                            <div className="app-title">{this.props.title}</div>

                            {/*{!PRODUCTION && this.props.isSub == false && (*/}
                            {/*    <React.Suspense fallback={<>...</>}>*/}
                            {/*        <DebugTool />*/}
                            {/*    </React.Suspense>*/}
                            {/*)}*/}

                            <div className="app-user" onClick={() => this.setState({ userMenuVisible: true })}>
                                <div className="app-user-icon">
                                    <CommonIcons.user />
                                </div>
                                {this.props.user?.login}
                            </div>
                            <div className="app-lang-change">
                                {languages.map((lang: string) => (
                                    <a
                                        key={lang}
                                        onClick={() => {
                                            configGetAll().translations.langChanged(lang, window.location.reload);
                                        }}
                                    >
                                        {lang}
                                    </a>
                                ))}
                            </div>
                            {topActions.length > 0 && (
                                <div className="w-backoffice-panel-top-actions">
                                    {topActions.map((action: ICommand | React.ElementType, index) => {
                                        if (action === null) {
                                            return null;
                                        } else if (React.isValidElement(action)) {
                                            return <React.Fragment key={index}>{action}</React.Fragment>;
                                        } else if ((action as ICommand).label !== undefined) {
                                            const command = action as ICommand;
                                            return (
                                                <div
                                                    className={"w-backoffice-panel-command-action"}
                                                    key={command.key}
                                                    onClick={(ev) => command.onClick(ev, null)}
                                                >
                                                    <command.icon /> {command.label}
                                                </div>
                                            );
                                        }
                                    })}
                                </div>
                            )}

                            <Modal
                                show={this.state.userMenuVisible}
                                animation={"perspectiveBounce"}
                                position={{ top: 50, right: 0 }}
                                onHide={() => this.setState({ userMenuVisible: false })}
                            >
                                <div style={{ width: 200 }} />
                                <div style={{ padding: 10 }}>
                                    {/*<a onClick={() => {
                            store.changeView('access/users/account');
                            this.setState({userMenuVisible: false});
                        }}><Icon name="Accounts"/> Twoje konto</a>*/}
                                </div>
                                <div style={{ padding: 10 }}>
                                    <a onClick={() => this.props.logout()}>
                                        <CommonIcons.exit style={{ verticalAlign: "middle" }} />{" "}
                                        {fI18n.t("frontend:logout")}
                                    </a>
                                </div>
                            </Modal>
                        </div>
                    )}
                    <div
                        className={"w-panel-body-container" + (this.props.isSub ? " w-panel-body-container-inner" : "")}
                    >
                        {this.state.menuVisible && !this.state.onlyBody && (
                            <div className="w-panel-menu">
                                <Menu
                                    elements={this.props.menu}
                                    onMenuElementClick={this.handleNavigateTo}
                                    mobile={this.state.layout == "mobile"}
                                />
                            </div>
                        )}
                        <div className="w-panel-body" style={{ position: "relative" }}>
                            {this.props.children}
                        </div>
                    </div>

                    {this.state.navigationWindowOpened && (
                        <Modal show={true} onHide={() => this.toggleLayerMenu()} position={{ top: 200 }}>
                            <div style={{ width: 300 }}>
                                Musimy tu TODO wstawić selecta
                                {/*<Select*/}
                                {/*    onClose={() => this.toggleLayerMenu()}*/}
                                {/*    options={this.props.menu.reduce((p, c) => {*/}
                                {/*        return p.concat(*/}
                                {/*            c.elements.map((el) => {*/}
                                {/*                return { label: c.title + " -> " + el.title, value: el.route };*/}
                                {/*            }),*/}
                                {/*        );*/}
                                {/*    }, [])}*/}
                                {/*    value={null}*/}
                                {/*    autoFocus={true}*/}
                                {/*    mode="list"*/}
                                {/*    onChange={(e) => {*/}
                                {/*        this.toggleLayerMenu();*/}
                                {/*        this.handleNavigateTo({*/}
                                {/*            title: "---",*/}
                                {/*            route: e.value,*/}
                                {/*            icon: null,*/}
                                {/*        });*/}
                                {/*    }}*/}
                                {/*/>*/}
                            </div>
                        </Modal>
                    )}
                    {!this.props.isSub && <div id="modal-root" />}
                </HotKeys>
            </div>
        );
    }
}
