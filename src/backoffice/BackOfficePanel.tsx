import * as React from 'react'
import {Arrow} from "../../../../data/cache/db/ts-definitions";
import IUser = Arrow.Access.Models.IUser;
import {Icon} from 'frontend/src/ctrl/Icon';
import PanelComponentLoader from 'frontend/src/lib/PanelComponentLoader';

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
    currentBodyComponent: string
}

export default class BackOfficePanel extends React.Component<IBackOfficePanelProps, IBackOfficePanelState> {


    constructor(props: IBackOfficePanelProps) {
        super();
        let hash = window.location.hash.replace("#", "");




        let link = hash.replace(props.appBaseURL, "");
        link = link.replace(/\//g, "_");


        this.state = {
            bodyComponentPath: hash,
            currentBodyComponent: null
        }
    }

    render() {


        let bodyCompName = this.state.currentBodyComponent;

        return <div className="w-panel-container">
            <div className="w-panel-top">
                <div className="app-icon" onClick={() => this.setState({currentBodyComponent: '/admin/dashboard'})}>
                    <i className={"ms-Icon ms-Icon--" + this.props.appIcon}/>
                </div>
                <div className="app-title">
                    {this.props.appTitle}
                </div>

                <div className="app-user">
                    <div className="app-user-icon">
                        <Icon name="Contact"/>
                    </div>
                    {this.props.user.login}

                </div>

            </div>

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
    }
}


interface IMenuProps {

    elements: IMenuSection[]
    onMenuElementClick: {(element: IMenuElement): any}

}


class Menu extends React.Component<IMenuProps, any> {
    constructor(props: IBackOfficePanelProps) {
        super();
        this.state = {
            currentMenuOpened: 0
        }
    }

    render() {
        return <div>
            {this.props.elements.map((el, index) =>
                <div className="menu-section">
                    <div
                        className="menu-section-title"

                        onClick={() => this.setState({currentMenuOpened: index})}
                    >
                        <Icon name={el.icon}/>
                        <span>{el.title}</span>
                    </div>
                    <div
                        className={"menu-section-section menu-section-section-" + (index == this.state.currentMenuOpened ? 'opened' : 'closed')}

                    >
                        {el.elements.map(el =>
                            <div className="menu-link" onClick={() => this.props.onMenuElementClick(el)}>
                                {el.title}
                            </div>
                        )}
                    </div>
                </div>
            )}
            <div className="menu-collapse ">
                <Icon name="DoubleChevronLeftMed" />
            </div>
        </div>
    }
}