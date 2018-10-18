import * as React from "react";

import { Positioner, RelativePositionPresets } from "../Positioner";

import "./Tooltip.sass";
import { alertDialog } from "../AlertDialog";
import { LoadingIndicator } from "../LoadingIndicator";
import { IPositionCalculatorOptions } from "../lib";

interface ITooltipProps {
    /**
     * Is visible
     */
    visible?: boolean;

    /**
     * Loading indicator text
     */
    loadingIndicatorText?: string;

    content?: string | Promise<any> | any;

    template?: (data: any) => JSX.Element | string;

    theme?: string;
    activation?: "hover" | "click";

    /**
     * Custom class name
     */
    customClass?: string;

    relativeSettings?: IPositionCalculatorOptions;
}

interface ITooltipState {
    mouseOver: boolean;
    content: string | any;
    loading: boolean;
}

export default class Tooltip extends React.PureComponent<ITooltipProps, ITooltipState> {
    private container = React.createRef<HTMLSpanElement>();

    private timeout: number = 0;
    public static defaultProps: ITooltipProps = {
        visible: true,
        theme: "dark",
        activation: "hover",
        relativeSettings: RelativePositionPresets.bottomLeft,
    };

    constructor(props: ITooltipProps) {
        super(props);

        const isPromise = props.content && (props.content as Promise<any>).then !== undefined;

        this.state = {
            mouseOver: false,
            loading: isPromise,
            content: isPromise ? null : props.content,
        };
    }

    public mouseOver = () => {
        if (this.timeout !== 0) {
            clearTimeout(this.timeout);
            this.timeout = 0;
        }

        this.setState({ mouseOver: true });
        const isPromise = this.props.content && (this.props.content as Promise<any>).then !== undefined;
        if (isPromise) {
            (this.props.content as Promise<any>).then((result) => {
                this.setState({ content: result, loading: false });
            });
        }
    };
    public mouseOut = () => {
        if (this.timeout === 0) {
            this.timeout = window.setTimeout(() => {
                this.setState({ mouseOver: false });
                this.timeout = 0;
            }, 10);
        }
    };

    public render() {
        const props = this.props;
        const state = this.state;
        return (
            <span
                ref={this.container}
                onMouseOver={props.activation == "hover" || this.state.mouseOver ? this.mouseOver : null}
                onClick={props.activation == "click" ? this.mouseOver : null}
                onMouseOut={this.mouseOut}
            >
                {props.children}
                {state.mouseOver && (
                    <Positioner
                        relativeTo={() => this.container.current}
                        animation={"from-up"}
                        relativeSettings={props.relativeSettings}
                    >
                        <div
                            className={"w-tooltip-hover-" + props.theme}
                            onMouseOver={this.mouseOver}
                            onMouseOut={this.mouseOut}
                        >
                            {state.loading ? (
                                <LoadingIndicator text={props.loadingIndicatorText} />
                            ) : props.template ? (
                                props.template(state.content)
                            ) : (
                                state.content
                            )}
                        </div>
                    </Positioner>
                )}
            </span>
        );
    }
}

export const tooltip = () => alertDialog("In implementation");
