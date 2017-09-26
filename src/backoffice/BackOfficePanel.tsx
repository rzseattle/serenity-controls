import * as React from 'react'
import {Arrow} from "../../../../data/cache/db/ts-definitions";
import IUser = Arrow.Access.Models.IUser;
import {Icon} from 'frontend/src/ctrl/Icon';
import PanelComponentLoader from 'frontend/src/lib/PanelComponentLoader';
import {Modal} from 'frontend/src/ctrl/Overlays';

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

}

interface IBackOfficePanelState {
    bodyComponentPath: string
    currentBodyComponent: string,
    userMenuVisible: boolean,
}

export default class BackOfficePanel extends React.Component<IBackOfficePanelProps, IBackOfficePanelState> {
    container: HTMLDivElement;


    constructor(props: IBackOfficePanelProps) {
        super();
        let hash = window.location.hash.replace("#", "");


        let link = hash.replace(props.appBaseURL, "");
        link = link.replace(/\//g, "_");


        this.state = {
            bodyComponentPath: hash,
            currentBodyComponent: null,
            userMenuVisible: false
        }
    }

    componentDidMount() {
        this.container.style.height = window.innerHeight + 'px';
        let timeout = null;
        window.addEventListener('resize', () => {
            //clearTimeout(timeout);
            timeout = setTimeout(
                () => this.container.style.height = window.innerHeight + 'px',
                30
            );
        })
    }

    render() {


        let bodyCompName = this.state.currentBodyComponent;

        return <div className="w-panel-container" ref={(container) => this.container = container}>
            <div className="w-panel-top">
                <div className="app-icon" onClick={() => this.setState({currentBodyComponent: 'app/admin/dashboard'})}>
                    <i className={"ms-Icon ms-Icon--" + this.props.appIcon}/>
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
                <Modal show={this.state.userMenuVisible} top={50} right={0} onHide={() => this.setState({userMenuVisible: false})}>
                    <div style={{width: 200}}></div>
                    <div style={{padding: 10}}>
                        <a onClick={() => this.setState({currentBodyComponent: 'access/users/account', userMenuVisible: false})}><Icon name="Accounts"/> Twoje konto</a>
                    </div>
                    <div style={{padding: 10}}>
                        <a href={this.props.appBaseURL + "/access/accessController/logout"}><Icon name="SignOut"/> Wyloguj się</a>
                    </div>
                </Modal>

            </div>
            <div className="w-panel-body-container">

                <div className="w-panel-menu">
                    <Menu elements={this.props.appMenu}
                          onMenuElementClick={(element) => this.setState({currentBodyComponent: element.template})}

                    />
                </div>
                <div className="w-panel-body">

                    <PanelComponentLoader
                        componentPath={this.state.bodyComponentPath}
                        requestURI={this.props.requestURI}
                        component={bodyCompName}

                    />
                </div>
            </div>


        </div>
    }
}


interface IMenuProps {

    elements: IMenuSection[]
    onMenuElementClick: { (element: IMenuElement): any }

}


interface IMenuState {
    currentMenuOpened: number
    expanded: boolean
}

class Menu extends React.Component<IMenuProps, IMenuState> {
    constructor(props: IBackOfficePanelProps) {
        super();
        this.state = {
            currentMenuOpened: -1,
            expanded: false
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

    render() {
        return <div
            className={"w-menu " + (this.state.expanded ? 'w-menu-expanded' : 'w-menu-collapsed')}
            onMouseLeave={this.handleMenuLeave.bind(this)}
        >
            {this.props.elements.map((el, index) =>
                <div className="menu-section">
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
                            <div className="menu-link" onClick={() => this.props.onMenuElementClick(el)}>
                                {el.title}
                            </div>
                        )}
                    </div>
                </div>
            )}
            <div className="menu-collapse " onClick={() => this.setState({expanded: !this.state.expanded})}>
                <Icon
                    name={this.state.expanded ? "DoubleChevronLeftMed" : "DoubleChevronLeftMedMirrored"}

                />
            </div>
        </div>
    }
}