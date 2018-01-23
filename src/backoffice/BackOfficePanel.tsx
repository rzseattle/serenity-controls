import * as React from 'react'
import {Icon} from '../ctrl/Icon';
import PanelComponentLoader from '../lib/PanelComponentLoader';
import {Modal} from '../ctrl/Overlays';


import {observer} from "mobx-react";
import {IMenuSection, Menu} from 'frontend/src/backoffice/Menu';

import "react-progress-2/main.css"
import Progress from "react-progress-2";

//import {Arrow} from "../../../../data/cache/db/ts-definitions";


interface IBackOfficePanelProps {

    appIcon: string
    onlyBody?: boolean
    appTitle: string
    requestURI: string
    appBaseURL: string
    user: any
    appMenu: IMenuSection[]
    store: any

}

interface IBackOfficePanelState {
    currentView: string
    userMenuVisible: boolean,
    menuVisible: boolean,
    layout: "mobile" | "normal" | "large"
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
        }

        this.props.store.onViewLoad(() => this.handleLoadStart());
        this.props.store.onViewLoaded(() => this.handleLoadEnd());

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
            this.props.store.changeView('app/admin/dashboard')
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

    handleLoadStart() {
        Progress.show();
    }

    handleLoadEnd() {
        Progress.hide();
    }

    render() {

        if (this.props.onlyBody) {
            return <PanelComponentLoader store={this.props.store}/>;
        }


        return <div className="w-panel-container" ref={(container) => this.container = container}>
            <div className="w-panel-top">
                <div className="app-icon" onClick={this.handleAppIconClicked.bind(this)}>
                    <i className={"ms-Icon ms-Icon--" + (this.state.layout != "mobile" ? this.props.appIcon : "CollapseMenu")}/>
                </div>
                <div className="app-title">
                    {this.props.appTitle}
                </div>


                <div className="app-user" onClick={() => this.setState({userMenuVisible: true})}>
                    <div className="app-user-icon">
                        <Icon name="Contact"/>
                    </div>
                    {this.props.user.login}
                </div>
                {<div className={" w-loader " + (this.props.store.isViewLoading ? "w-loader-hidden" : "")}>
                    <span><i></i><i></i><i></i><i></i></span>
                </div>}

                <Modal show={this.state.userMenuVisible} top={50} right={0} onHide={() => this.setState({userMenuVisible: false})}>
                    <div style={{width: 200}}></div>
                    <div style={{padding: 10}}>
                        <a onClick={() => {
                            this.props.store.changeView('access/users/account');
                            this.setState({userMenuVisible: false});
                        }}><Icon name="Accounts"/> Twoje konto</a>
                    </div>
                    <div style={{padding: 10}}>
                        <a href={"/crm/access/logout"}><Icon name="SignOut"/> Wyloguj się</a>
                    </div>
                </Modal>

            </div>
            <div className="w-panel-body-container">

                {this.state.menuVisible && <div className="w-panel-menu">
                    <Menu elements={this.props.appMenu}
                          onMenuElementClick={this.handleElementClick.bind(this)}
                          mobile={(this.state.layout == "mobile")}
                    />
                </div>}
                <div className="w-panel-body" style={{position: "relative"}}>
                    <Progress.Component
                        style={{background: "black", top: 0,  zIndex: 30, height: 3, position: 'absolute', overflow: "hidden"}}
                        thumbStyle={{background: "#0078D7", height: 4}}
                    />
                    <PanelComponentLoader
                        store={this.props.store}
                        onLoadStart={this.handleLoadStart}
                        onLoadEnd={this.handleLoadEnd}

                    />
                </div>
            </div>


        </div>
    }
}

