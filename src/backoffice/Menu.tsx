import * as React from 'react'
import {Icon} from '../ctrl/Icon';

export interface IMenuSection {
    active: boolean
    elements: IMenuElement[]
    icon: string
    opened: boolean
    title: string
}

export interface IMenuElement {
    icon: string//"fa-shopping-cart"
    route: string//"app/shop/orders/index"
    title: string//"Zamówienia"
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

export class Menu extends React.Component<IMenuProps, IMenuState> {
    constructor(props: IMenuProps) {
        super(props);
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
