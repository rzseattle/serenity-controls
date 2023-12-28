import * as React from "react";

import s from "./Panel.module.sass";
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
        const classes = [s.panel];
        if (this.props.noPadding) {
            classes.push(s.panelNoPadding);
        }
        if (this.props.noBottomMargin) {
            classes.push(s.panelNoNottomMargin);
        }
        return (
            <div className={classes.join(" ")}>
                {props.title && (
                    <div className={s.title + " title"}>
                        {props.icon && <props.icon />}
                        {props.title}

                        {props.toolbar.length > 0 && (
                            <div className={s.panelToolbar}>
                                <CommandBar items={props.toolbar} />
                            </div>
                        )}
                    </div>
                )}
                <div className={s.panelBody}>{props.children}</div>
            </div>
        );
    }
}
