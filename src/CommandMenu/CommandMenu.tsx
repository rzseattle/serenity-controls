import * as React from "react";

import { ICommand } from "../CommandBar";
import Tooltip from "../Tooltip/Tooltip";
import { RelativePositionPresets } from "../Positioner";

import "./CommandMenu.sass";

interface IProps {
    items: ICommand[];
    children: (opened: boolean) => JSX.Element | string;
    activation?: "hover" | "click";
    context?: any;
}

interface IState {
    opened: boolean;
}

export class CommandMenu extends React.PureComponent<IProps, IState> {
    public static defaultProps: Partial<IProps> = {
        items: [],
        activation: "click",
        context: null,
    };

    constructor(props: IProps) {
        super(props);
        this.state = {
            opened: false,
        };
    }

    public render() {
        const { items, activation, context } = this.props;
        if (items.length === 0) {
            return this.props.children(false);
        }
        return (
            <div className="w-command-menu">
                <Tooltip
                    activation={activation}
                    content={items}
                    onShow={() => this.setState({ opened: true })}
                    onHide={() => this.setState({ opened: false })}
                    template={(data) => {
                        return (
                            <>
                                {data.map((item: ICommand | false) => {
                                    if (item !== null && item !== false) {
                                        return (
                                            <div
                                                key={item.key}
                                                onClick={(event) => {
                                                    item.onClick(event, context);
                                                    this.setState({ opened: false });
                                                }}
                                            >
                                                {item.icon && <item.icon />} {item.label}
                                            </div>
                                        );
                                    }
                                })}
                            </>
                        );
                    }}
                    relativeSettings={{ ...RelativePositionPresets.bottomLeft, widthCalc: "min" }}
                    layerClass="w-command-menu-layer"
                >
                    {this.props.children(this.state.opened)}
                </Tooltip>
            </div>
        );
    }
}
