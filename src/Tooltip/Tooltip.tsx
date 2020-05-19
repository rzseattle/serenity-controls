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

    /**
     * Layer content
     */
    content?: string | any;
    /**
     * Layer content template
     * @param data
     */
    promise?: () => Promise<any>;

    template?: (data: any) => JSX.Element | string;

    /**
     * Theme
     */
    theme?: "dark" | "light";

    /**
     * Auto open
     */
    autoOpen?: boolean;

    /**
     * Activattion terms
     */
    activation?: "hover" | "click";

    /**
     * Custom class name
     */
    customClass?: string;

    /**
     * Layer relative postiton settings
     */
    relativeSettings?: IPositionCalculatorOptions;

    /**
     * Custom css class for layer
     */
    layerClass?: string;

    /**
     * On show event
     */
    onHide?: () => any;

    /**
     * On hide event
     */
    onShow?: () => any;

    children?: ((opened: boolean) => any) | any;
}

interface ITooltipState {
    mouseOver: boolean;
    content: string | any;
    loading: boolean;
}

export default class Tooltip extends React.PureComponent<ITooltipProps, ITooltipState> {
    private container = React.createRef<HTMLSpanElement>();

    private timeout: number = 0;
    public static defaultProps: Partial<ITooltipProps> = {
        visible: true,
        autoOpen: false,
        theme: "dark",
        activation: "hover",
        relativeSettings: RelativePositionPresets.bottomLeft,
        promise: null,
        children: null,
    };

    constructor(props: ITooltipProps) {
        super(props);

        this.state = {
            mouseOver: false,
            loading: this.props.promise !== null,
            content: this.props.promise !== null ? null : props.content,
        };
    }

    componentDidMount(): void {
        if (this.props.autoOpen) {
            this.mouseOver();
        }
    }

    public mouseOver = () => {

        if (this.timeout !== 0) {
            clearTimeout(this.timeout);
            this.timeout = 0;
            return true;
        }

        if (this.state.mouseOver === true) {
            return;
        }

        this.setState({ mouseOver: true }, () => {
            if (this.props.onShow) {
                this.props.onShow();
            }
        });

        if (this.props.promise !== null) {
            this.props.promise().then((result) => {
                this.setState({ content: result, loading: false });
            });
        }
    };
    public mouseOut = () => {
        if (this.timeout === 0) {
            this.timeout = window.setTimeout(() => {
                this.setState({ mouseOver: false }, () => {
                    if (this.props.onHide) {
                        this.props.onHide();
                    }
                });
                this.timeout = 0;
            }, 300);
        }
    };

    public render() {
        const props = this.props;
        const state = this.state;
        return (
            <span
                className={"w-tooltip"}
                ref={this.container}
                onMouseOver={props.activation == "hover" || this.state.mouseOver ? this.mouseOver : null}
                onClick={ (props.activation == "click" ? this.mouseOver : null)}
                onMouseOut={this.mouseOut}
            >
                {typeof props.children == "function" ? props.children(this.state.mouseOver) : props.children}
                {state.mouseOver && (
                    <Positioner
                        relativeTo={() => this.container.current}
                        animation={"from-up"}
                        relativeSettings={props.relativeSettings}
                        trackResize={true}
                    >
                        <div
                            className={props.layerClass ? props.layerClass : "w-tooltip-hover-" + props.theme}
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
