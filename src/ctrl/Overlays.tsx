import * as React from "react";
import * as ReactDOM from "react-dom";
import ResizeObserver from "resize-observer-polyfill";
import { Icon } from "./Icon";
import { PositionCalculator } from "../lib/PositionCalculator";
import { LoadingIndicator } from "./LoadingIndicator";
import { IModalProps, Modal } from "./overlays/Modal";




interface IConfirmModalProps extends IModalProps {
    showCancelLing?: boolean;
}

class ConfirmModal extends React.Component<IConfirmModalProps, any> {
    public promise: Promise<{}>;
    public promiseReject: any;
    public promiseResolve: any;
    public static defaultProps: Partial<IConfirmModalProps> = {
        showCancelLing: true,
    };

    constructor(props) {
        super(props);
    }

    public handleAbort = () => {
        this.props.cleanup();
    };

    public handleConfirm = () => {
        this.props.onOk();
        this.props.cleanup();
    };

    public render() {
        const modalProps: any = Object.assign({}, this.props);
        delete modalProps.cleanup;

        return (
            <Modal {...modalProps} className="w-modal-confirm" show={true}>
                <div style={{ padding: 15, borderTop: "solid #0078d7 10px" }}>{this.props.children}</div>
                <div style={{ padding: 10, paddingTop: 0, textAlign: "right" }}>
                    <button onClick={this.handleConfirm} className="btn btn-primary">
                        ok
                    </button>
                    {this.props.showCancelLing && (
                        <button onClick={this.handleAbort} className="btn btn-default">
                            anuluj
                        </button>
                    )}
                </div>
            </Modal>
        );
    }
}

const confirm = async (message, options: Partial<IConfirmModalProps> = {}) => {
    const props = { ...options };

    const parent = options.container ? options.container() : document.body;

    const wrapper = parent.appendChild(document.createElement("div"));

    let resolver, rejector;

    const promise = new Promise((resolve, reject) => {
        resolver = resolve;
        rejector = reject;
    });

    const cleanup = () => {
        ReactDOM.unmountComponentAtNode(wrapper);
        wrapper.remove();
        rejector();
    };

    const x: any = (
        <ConfirmModal {...props} onOk={resolver} cleanup={cleanup}>
            <div>{message}</div>
        </ConfirmModal>
    );

    ReactDOM.render(x, wrapper);

    return promise;
};

const _alert = async (message, options: IConfirmConf = {}) => {
    options.showCancelLing = false;
    return confirm(message, options);
};

export const tooltip = (content, options: ITooltipProps) => {
    const props = { ...options };

    const parent = document.getElementById("modal-root");

    const wrapper = parent.appendChild(document.createElement("div"));
    const cleanup = () => {
        ReactDOM.unmountComponentAtNode(wrapper);
        wrapper.remove();
    };

    const component = ReactDOM.render(
        <Tooltip {...props}>
            <div>{content}</div>
        </Tooltip>,
        wrapper,
    );

    return cleanup;
};

interface ITooltipProps {
    theme?: "light" | "dark";
    content?: () => any;
    type?: "hover" | "click";
    onHide?: () => any;
    target: any;
    targetAt?: string;
    itemAt?: string;
    offsetY?: number;
    offsetX?: number;
}

class Tooltip extends React.Component<ITooltipProps, any> {
    public tooltipEl: HTMLDivElement;
    public static defaultProps: Partial<ITooltipProps> = {
        theme: "dark",
        type: "hover",
        content: null,
        itemAt: "bottom middle",
        targetAt: "top middle",
        offsetX: 0,
        offsetY: 0,
    };

    constructor(props) {
        super(props);
        this.state = {
            brakeLeft: 0,
            // orientation: this.props.orientation,
            isVisible: false,
        };
    }

    public componentDidMount() {
        setTimeout(() => {
            window.requestAnimationFrame(() => {
                if (this.tooltipEl) {
                    const calculator = new PositionCalculator(this.props.target(), this.tooltipEl, {
                        targetAt: this.props.targetAt,
                        itemAt: this.props.itemAt,
                        offsetY: this.props.offsetY,
                        offsetX: this.props.offsetX,
                    });
                    calculator.calculate();
                    calculator.calculate();
                    this.tooltipEl.style.opacity = "1";
                    this.tooltipEl.focus();
                }
            });
        }, 0);

        // let targetPos = this.props.target().getBoundingClientRect();
        /// let center = Math.round(/*targetPos.left -*/ targetPos.width / 2);
        // this.setState({ brakeLeft: center });
    }

    public componentDidUpdate() {
        // let targetPos = this.props.target().getBoundingClientRect();
        // let center = Math.round(targetPos.left - ( targetPos.width / 2 ));
        // this.setState({brakeLeft: center});
    }

    public orientationChange(type) {
        // this.setState({orientation: 'top left edge'})
    }

    private handleMouseEnter = () => {
        if (this.props.type == "hover") {
            this.setState({ isVisible: true });
        }
    };

    private handleMouseOut = () => {
        if (this.props.type == "hover") {
            this.setState({ isVisible: false });
        }
    };

    private handleClick = () => {
        if (this.props.type == "click") {
            this.setState({ isVisible: true }); // !this.state.isVisible
        }
    };

    public handleBlur = () => {
        this.setState({ isVisible: false });
        if (this.props.onHide) {
            this.props.onHide();
        }
    };

    public render() {
        const { theme, content } = this.props;

        return (
            <Portal>
                <div
                    onMouseEnter={this.handleMouseEnter}
                    tabIndex={-1}
                    onBlur={this.handleBlur}
                    onMouseLeave={this.handleMouseOut}
                    onClick={this.handleClick}
                    className={"w-tooltip"}
                    ref={(el) => (this.tooltipEl = el)}
                >
                    <div className={`w-tooltip-hover w-tooltip-hover-${theme}`} style={{}}>
                        {this.props.children} {content && content()}
                    </div>
                </div>
            </Portal>
        );
    }
}

export {  Tooltip, confirm, confirm as _confirm, _alert };
