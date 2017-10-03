import * as React from 'react'
import {Arrow} from "../../../../data/cache/db/ts-definitions";
import IUser = Arrow.Access.Models.IUser;
import {Icon} from 'frontend/src/ctrl/Icon';
import PanelComponentLoader from 'frontend/src/lib/PanelComponentLoader';
import {Modal} from 'frontend/src/ctrl/Overlays';


import {observer} from "mobx-react";

interface IMenuSection {
    active: boolean
    elements: IMenuElement[]
    icon: string
    opened: boolean
    title: string
}

interface IMenuElement {
    icon: string//"fa-shopping-cart"
    template: string//"app/shop/orders/index"
    title: string//"Zamówienia"
}

interface IBackOfficePanelProps {

    appIcon: string
    appTitle: string
    requestURI: string
    appBaseURL: string
    user: IUser
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


    constructor(props: IBackOfficePanelProps) {
        super();

        this.state = {
            currentView: null,
            userMenuVisible: false,
            menuVisible: true,
            layout: "normal",
        }

        console.error("BackOfficePanel", "constructor")
    }

    adjustToSize() {
        this.container.style.height = window.innerHeight + 'px';
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
        this.container.style.height = window.innerHeight + 'px';
        this.adjustToSize()
        let timeout = null;
        window.addEventListener('resize', () => {
            //clearTimeout(timeout);
            timeout = setTimeout(this.adjustToSize.bind(this), 30);
        })
    }

    render() {


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
                        <a href={"access/accessController/logout"}><Icon name="SignOut"/> Wyloguj się</a>
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
                <div className="w-panel-body">
                    <PanelComponentLoader store={this.props.store}/>
                </div>
            </div>


        </div>
    }
}


interface IMenuProps {

    elements: IMenuSection[]
    onMenuElementClick: { (element: IMenuElement): any }
    mobile: boolean

}


interface IMenuState {
    currentMenuOpened: number
    expanded: boolean
}

class Menu extends React.Component<IMenuProps, IMenuState> {
    constructor(props: IMenuProps) {
        super();
        this.state = {
            currentMenuOpened: -1,
            expanded: props.mobile
        }
    }

    handleTitleEnter(index) {
        if (!this.state.expanded) {
            this.setState({currentMenuOpened: index});
        }

    }

    handleMenuLeave() {
        if (!this.state.expanded) {
            this.setState({currentMenuOpened: -1});
        }
    }

    handleElementClick(el) {
        this.props.onMenuElementClick(el);

    }

    render() {

        let style = {};
        if (this.props.mobile) {
            style = {
                position: "absolute",
                top: 50,
                bottom: 0,
                zIndex: 100
            }
        }
        return <div
            className={"w-menu " + (this.state.expanded ? 'w-menu-expanded' : 'w-menu-collapsed')}
            onMouseLeave={this.handleMenuLeave.bind(this)}
            style={style}
        >
            {this.props.elements.map((el, index) =>
                <div className="menu-section" key={index}>
                    <div
                        className="menu-section-title"
                        onClick={() => this.setState({currentMenuOpened: index})}
                        onMouseEnter={this.handleTitleEnter.bind(this, index)}
                    >
                        <Icon name={el.icon}/>
                        <span>{el.title}</span>
                    </div>
                    <div
                        className={"menu-section-section menu-section-section-" + (index == this.state.currentMenuOpened ? 'opened' : 'closed')}
                    >
                        {!this.state.expanded && <div className="section-inner-title">{el.title}</div>}
                        {el.elements.map(el =>
                            <div key={el.title} className="menu-link" onClick={this.handleElementClick.bind(this, el)}>
                                {el.title}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {!this.props.mobile && <div className="menu-collapse " onClick={() => this.setState({expanded: !this.state.expanded})}>
                <Icon
                    name={this.state.expanded ? "DoubleChevronLeftMed" : "DoubleChevronLeftMedMirrored"}
                />
            </div>}
        </div>
    }
}