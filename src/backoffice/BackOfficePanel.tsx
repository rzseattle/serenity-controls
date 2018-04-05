import * as React from 'react'
import {Icon} from '../ctrl/Icon';
import PanelComponentLoader from '../lib/PanelComponentLoader';
import {Modal} from '../ctrl/Overlays';

import {IMenuSection, Menu} from 'frontend/src/backoffice/Menu';
import {BackOfficeContainer} from 'frontend/src/backoffice/BackOfficeContainer';

import * as NProgress from "nprogress/nprogress.js"
import "nprogress/nprogress.css"
import Comm from 'frontend/src/lib/Comm';

import {BackofficeStore} from "frontend/src/backoffice/BackofficeStore";

NProgress.configure({parent: '.w-panel-body'});


interface IBackOfficePanelProps {
    icon?: string
    onlyBody?: boolean
    isSub?: boolean
    title?: string
    user?: any
    menu?: IMenuSection[]
    store?: BackofficeStore
}

interface IBackOfficePanelState {
    currentView: string
    userMenuVisible: boolean,
    menuVisible: boolean,
    layout: "mobile" | "normal" | "large",
    loading: boolean,
    onlyBody: boolean,
    contextState: any,
    openedWindows: any,
}

export default class BackOfficePanel extends React.Component<IBackOfficePanelProps, IBackOfficePanelState> {
    container: HTMLDivElement;
    store: BackofficeStore

    public static defaultProps: Partial<IBackOfficePanelProps> = {
        onlyBody: false,
        isSub: false
    }

    constructor(props: IBackOfficePanelProps) {
        super(props);

        this.store = this.props.store ? this.props.store : new BackofficeStore();

        this.state = {
            currentView: null,
            userMenuVisible: false,
            menuVisible: true,
            layout: "normal",
            loading: false,
            onlyBody: this.props.onlyBody,
            contextState: this.store.getState(),
            openedWindows: [],
        }

        this.store.onViewLoad(() => this.handleLoadStart());
        this.store.onViewLoaded(() => this.handleLoadEnd());

        Comm.onStart = this.handleLoadStart;
        Comm.onFinish = this.handleLoadEnd;

    }

    adjustToSize() {
        if (this.container) {
            this.container.style.height = window.innerHeight + 'px';
        }
        if (window.innerWidth <= 479 && this.state.layout != "mobile") {
            this.setState({layout: 'mobile', menuVisible: false});
        } else if (window.innerWidth > 479 && this.state.layout != "normal") {
            this.setState({layout: 'normal', menuVisible: true});
        }
    }

    handleAppIconClicked() {
        if (this.state.layout != "mobile") {
            this.store.changeView('/admin/dashboard')
        } else {
            this.setState({menuVisible: !this.state.menuVisible});
        }
    }

    handleElementClick(element, inWindow = false) {
        if (inWindow) {
            this.setState({
                openedWindows: this.state.openedWindows.concat(element)
            });
        } else {
            this.store.changeView(element.route)
        }
        if (this.state.layout == "mobile") {
            this.setState({menuVisible: false});
        }
    }

    handleCloseWindow(route: any): any {
        this.setState({
            openedWindows: this.state.openedWindows.filter((el) => el.route != route)
        });
    }

    componentDidMount() {
        this.store.onDataUpdated(() => {
            this.setState({contextState: this.store.getState()})
        })
        if (!this.props.isSub) {
            this.store.initRootElement();
            this.adjustToSize()
            let timeout = null;
            window.addEventListener('resize', () => {
                //clearTimeout(timeout);
                timeout = setTimeout(this.adjustToSize.bind(this), 30);
            })
        }
    }

    handleLoadStart = () => {
        NProgress.start();
    }

    handleLoadEnd = () => {
        NProgress.done();
    }

    handleSetPanelOption(name, value, callback) {
        let obj = {};
        obj[name] = value;
        this.setState(obj, callback);
    }

    render() {

        return <div className="w-panel-container" ref={(container) => this.container = container}>
            {!this.state.onlyBody && <div className="w-panel-top">
                <div className="app-icon" onClick={this.handleAppIconClicked.bind(this)}>
                    <i className={"ms-Icon ms-Icon--" + (this.state.layout != "mobile" ? this.props.icon : "CollapseMenu")}/>
                </div>
                <div className="app-title">
                    {this.props.title}
                </div>


                <div className="app-user" onClick={() => this.setState({userMenuVisible: true})}>
                    <div className="app-user-icon">
                        <Icon name="Contact"/>
                    </div>
                    {this.props.user.login}
                </div>
                {false && <div
                    className={" w-loader " + (this.store.isViewLoading || this.state.loading ? "w-loader-hidden" : "")}>
                    <span><i></i><i></i><i></i><i></i></span>
                </div>}

                <Modal show={this.state.userMenuVisible} top={50} right={0}
                       onHide={() => this.setState({userMenuVisible: false})}>
                    <div style={{width: 200}}></div>
                    <div style={{padding: 10}}>
                        {/*<a onClick={() => {
                            store.changeView('access/users/account');
                            this.setState({userMenuVisible: false});
                        }}><Icon name="Accounts"/> Twoje konto</a>*/}
                    </div>
                    <div style={{padding: 10}}>
                        <a href={Comm.basePath + "/access/logout"}><Icon name="SignOut"/> {__("Wyloguj się")}</a>
                    </div>
                </Modal>

            </div>}
            <div className={"w-panel-body-container" + (this.props.isSub ? " w-panel-body-container-inner" : "")}>

                {this.state.menuVisible && !this.state.onlyBody && <div className="w-panel-menu">
                    <Menu elements={this.props.menu}
                          onMenuElementClick={this.handleElementClick.bind(this)}
                          mobile={(this.state.layout == "mobile")}
                    />
                </div>}
                <div className="w-panel-body" style={{position: "relative"}}>

                    {this.state.openedWindows.map((el) => {

                        return (
                            <Modal
                                show={true}
                                onHide={() => this.handleCloseWindow(el.route)}
                                title={el.title}
                                showHideLink={true}
                                top={55}
                            >
                                <div style={{width: "90vw", paddingBottom: 10, backgroundColor: "#ECECEC"}}>
                                    <BackOfficeContainer route={el.route}/>
                                </div>
                            </Modal>
                        );
                    })}

                    <PanelComponentLoader
                        context={{
                            ...this.state.contextState,
                            changeView: this.store.changeView,
                            onViewLoad: this.store.onViewLoad,
                            onViewLoaded: this.store.onViewLoaded,
                        }}
                        onLoadStart={this.handleLoadStart.bind(this)}
                        onLoadEnd={this.handleLoadEnd.bind(this)}
                        setPanelOption={this.handleSetPanelOption.bind(this)}
                        isSub={this.props.isSub}
                    />
                </div>
            </div>


        </div>
    }
}

