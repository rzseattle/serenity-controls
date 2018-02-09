import * as React from 'react'
import {Icon} from '../ctrl/Icon';
import PanelComponentLoader from '../lib/PanelComponentLoader';
import {Modal} from '../ctrl/Overlays';


import {observer} from "mobx-react";
import {IMenuSection, Menu} from 'frontend/src/backoffice/Menu';

import * as NProgress from "nprogress/nprogress.js"
import "nprogress/nprogress.css"
import Comm from 'frontend/src/lib/Comm';

NProgress.configure({parent: '.w-panel-body'});


interface IBackOfficePanelProps {
    icon: string
    onlyBody?: boolean
    title: string
    user: any
    menu: IMenuSection[]
    store: any

}

interface IBackOfficePanelState {
    currentView: string
    userMenuVisible: boolean,
    menuVisible: boolean,
    layout: "mobile" | "normal" | "large",
    loading: boolean,
    onlyBody: boolean
}

@observer
export default class BackOfficePanel extends React.Component<IBackOfficePanelProps, IBackOfficePanelState> {
    container: HTMLDivElement;

    public static defaultProps: Partial<IBackOfficePanelProps> = {
        onlyBody: false
    }


    constructor(props: IBackOfficePanelProps) {
        super(props);

        this.state = {
            currentView: null,
            userMenuVisible: false,
            menuVisible: true,
            layout: "normal",
            loading: false,
            onlyBody: this.props.onlyBody,
        }

        this.props.store.onViewLoad(() => this.handleLoadStart());
        this.props.store.onViewLoaded(() => this.handleLoadEnd());

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
            this.props.store.changeView('/admin/dashboard')
        } else {
            this.setState({menuVisible: !this.state.menuVisible});
        }
    }

    handleElementClick(element) {
        this.props.store.changeView(element.template)
        if (this.state.layout == "mobile") {
            this.setState({menuVisible: false});
        }
    }

    componentDidMount() {
        this.adjustToSize()
        let timeout = null;
        window.addEventListener('resize', () => {
            //clearTimeout(timeout);
            timeout = setTimeout(this.adjustToSize.bind(this), 30);
        })
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
                {<div
                    className={" w-loader " + (this.props.store.isViewLoading || this.state.loading ? "w-loader-hidden" : "")}>
                    <span><i></i><i></i><i></i><i></i></span>
                </div>}

                <Modal show={this.state.userMenuVisible} top={50} right={0}
                       onHide={() => this.setState({userMenuVisible: false})}>
                    <div style={{width: 200}}></div>
                    <div style={{padding: 10}}>
                        <a onClick={() => {
                            this.props.store.changeView('access/users/account');
                            this.setState({userMenuVisible: false});
                        }}><Icon name="Accounts"/> Twoje konto</a>
                    </div>
                    <div style={{padding: 10}}>
                        <a href={Comm.basePath + "/access/logout"}><Icon name="SignOut"/> Wyloguj się</a>
                    </div>
                </Modal>

            </div>}
            <div className="w-panel-body-container">

                {this.state.menuVisible && !this.state.onlyBody && <div className="w-panel-menu">
                    <Menu elements={this.props.menu}
                          onMenuElementClick={this.handleElementClick.bind(this)}
                          mobile={(this.state.layout == "mobile")}
                    />
                </div>}
                <div className="w-panel-body" style={{position: "relative"}}>
                    <PanelComponentLoader
                        store={this.props.store}
                        onLoadStart={this.handleLoadStart.bind(this)}
                        onLoadEnd={this.handleLoadEnd.bind(this)}
                        setPanelOption={this.handleSetPanelOption.bind(this)}

                    />
                </div>
            </div>


        </div>
    }
}

