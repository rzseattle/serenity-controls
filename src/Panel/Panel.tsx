import * as React from "react";

import "./Panel.sass";
import { CommandBar, ICommand } from "../CommandBar";

export interface IPanelProps {
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
    toolbar?: ICommand[];

    /**
     * Icon
     */
    icon?: React.JSXElementConstructor<any>;

    children: React.ReactNode;
}

export class Panel extends React.PureComponent<IPanelProps> {
    public static defaultProps: Partial<IPanelProps> = {
        noPadding: false,
        noBottomMargin: true,
        title: "",
        icon: null,
        toolbar: [],
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
                {props.title && (
                    <div className="title ">
                        {props.icon && <props.icon />}
                        {props.title}
                        {props.toolbar.length > 0 && (
                            <div className="panel-toolbar">
                                <CommandBar items={props.toolbar} />{" "}
                            </div>
                        )}
                    </div>
                )}
                <div className="panel-body ">{props.children}</div>
            </div>
        );
    }
}
