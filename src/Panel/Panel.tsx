import * as React from "react";

import "./Panel.sass";
import { Icon } from "../Icon";

interface IPanelProps {
    /**
     * Panel title
     */
    title?: string;
    /**
     * Disables any padding
     */
    noPadding?: boolean;
    /**
     * Disables bottom margin
     */
    noBottomMargin?: boolean;
    /**
     * Toolbar elements
     */
    // toolbar?: JSX.Element;

    /**
     * Icon
     */
    icon?: string;
}

export class Panel extends React.PureComponent<IPanelProps> {
    public static defaultProps: Partial<IPanelProps> = {
        noPadding: false,
        noBottomMargin: true,
        title: "",
        icon: "",
    };

    public render() {
        const props = this.props;
        const classes = ["w-panel"];
        if (this.props.noPadding) {
            classes.push("panel-no-padding");
        }
        if (this.props.noBottomMargin) {
            classes.push("panel-no-bottom-margin");
        }
        return (
            <div className={classes.join(" ")}>
                <div className="panel-body ">
                    {props.title && (
                        <div className="title ">
                            {props.icon && <Icon name={props.icon} />}
                            {props.title}
                            {/*<div className="panel-toolbar">{props.toolbar}</div>*/}
                        </div>
                    )}
                    {props.children}
                </div>
            </div>
        );
    }
}
