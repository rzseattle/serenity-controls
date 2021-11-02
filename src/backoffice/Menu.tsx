import * as React from "react";

import "./Menu.sass";
import { CommonIcons } from "../lib/CommonIcons";
import { HiOutlineChevronDoubleLeft } from "react-icons/hi";
import { BsChevronDoubleRight } from "react-icons/bs";

export interface IMenuSection {
    active: boolean;
    elements: IMenuElement[];
    icon?: React.JSXElementConstructor<any>;
    opened: boolean;
    title: string;
}

export interface IMenuElement {
    icon?: React.JSXElementConstructor<any>;
    route: string;
    title: string;
}

interface IMenuProps {
    elements: IMenuSection[];
    onMenuElementClick: (element: IMenuElement, inWindow?: boolean) => any;
    mobile: boolean;
}

interface IMenuState {
    currentMenuOpened: number;
    expanded: boolean;
}

export class Menu extends React.PureComponent<IMenuProps, IMenuState> {
    constructor(props: IMenuProps) {
        super(props);
        // @ts-ignore
        // if (window.localStorage.backofficeMenuOpened === undefined) {
        //     // @ts-ignore
        //     window.localStorage.backofficeMenuOpened = "1";
        // }

        this.state = {
            currentMenuOpened: -1,
            expanded: null,
            // @ts-ignore
            // window.localStorage.backofficeMenuOpened !== undefined
            //     ? // prettier-ignore
            //       // @ts-ignore
            //       window.localStorage.backofficeMenuOpened == "1"
            //     : props.mobile,
        };
    }

    public handleTitleEnter = (index: number) => {
        if (!this.state.expanded) {
            this.setState({ currentMenuOpened: index });
        }
    };

    public handleMenuLeave = () => {
        if (!this.state.expanded) {
            this.setState({ currentMenuOpened: -1 });
        }
    };

    public handleElementClickOpen(el: IMenuElement, event: React.MouseEvent) {
        event.stopPropagation();
        this.props.onMenuElementClick(el, true);
    }

    public handleElementClick(el: IMenuElement) {
        this.props.onMenuElementClick(el);
    }

    public changeExpandState = () => {
        // @ts-ignore
        window.localStorage.backofficeMenuOpened = this.state.expanded ? "0" : "1";
        this.setState({ expanded: !this.state.expanded });
    };

    public render() {
        let style = {};
        if (this.props.mobile) {
            style = {
                position: "absolute",
                top: 50,
                bottom: 0,
                zIndex: 100,
            };
        }
        return (
            <div
                className={"w-menu " + (this.state.expanded ? "w-menu-expanded" : "w-menu-collapsed")}
                onMouseLeave={this.handleMenuLeave}
                style={style}
            >
                {this.props.elements.map((el, index) => {
                    return (
                        <div className="menu-section" key={index}>
                            <div
                                className="menu-section-title"
                                onClick={() => this.setState({ currentMenuOpened: index })}
                                onMouseEnter={() => this.handleTitleEnter(index)}
                            >
                                <el.icon />
                                <span>{el.title}</span>
                            </div>
                            <div
                                className={
                                    "menu-section-section menu-section-section-" +
                                    (index == this.state.currentMenuOpened ? "opened" : "closed")
                                }
                            >
                                {!this.state.expanded && <div className="section-inner-title">{el.title}</div>}
                                {index == this.state.currentMenuOpened &&
                                    el.elements.map((subelement) => (
                                        <div
                                            key={subelement.title}
                                            className="menu-link"
                                            onClick={() => this.handleElementClick(subelement)}
                                        >
                                            {React.isValidElement(subelement.icon) && (
                                                <subelement.icon className={"menu-link-title-icon"} />
                                            )}
                                            {subelement.title}
                                            <div
                                                onClick={(event) => this.handleElementClickOpen(subelement, event)}
                                                className={"menu-link-open-window"}
                                            >
                                                <CommonIcons.openInNewWindow />
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    );
                })}

                {!this.props.mobile && (
                    <div className="menu-collapse " onClick={this.changeExpandState}>
                        <i>{this.state.expanded ? <HiOutlineChevronDoubleLeft /> : <BsChevronDoubleRight />}</i>
                    </div>
                )}
            </div>
        );
    }
}
