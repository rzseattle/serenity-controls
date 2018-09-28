import React from "react";
import "./Modal.sass";
import Icon from "../Icon";
import { Positioner } from "./Positioner";
import { IPositionCalculatorOptions } from "../../lib/PositionCalculator";

export interface IModalProps {
    show: boolean;

    onShow?(): any;

    onHide?(): any;

    container?(): HTMLElement;

    target?(): HTMLElement;

    recalculatePosition?: boolean;
    showHideLink?: boolean;
    title?: string;
    icon?: string;
    shadow?: boolean;
    layer?: boolean;
    width?: string | number;
    height?: string | number;
    top?: string | number;
    left?: string | number;
    bottom?: string | number;
    right?: string | number;
    className?: string;
    children: any;
    orientation?: string;
    relativePositionConf: IPositionCalculatorOptions;
    animation: string;

    onOrientationChange?(type: string): any;
}

export class Modal extends React.PureComponent<IModalProps> {
    public el: HTMLElement;
    public modalBody: HTMLDivElement;

    public static defaultProps = {
        show: false,

        recalculatePosition: true,
        shadow: true,
        layer: true,
        animation: "fade-in",
    };

    constructor(props: IModalProps) {
        super(props);
    }

    public handleClose = () => {
        if (this.props.onHide) {
            this.props.onHide();
        }
    };

    public handleShow = () => {
        if (this.props.onShow) {
            this.props.onShow();
        }
    };

    public componentWillReceiveProps(nextProps: IModalProps) {
        if (this.props.show == false && nextProps.show == true) {
            this.handleShow();
        }
    }

    public componentDidMount() {
        if (this.props.show) {
            this.handleShow();
        }
    }

    public render() {
        const p = this.props;
        if (!p.show) {
            return null;
        }

        const conf: any = {};
        if (p.right !== undefined) {
            conf.right = p.right;
            conf.left = undefined;
        }
        if (p.left !== undefined) {
            conf.left = p.left;
        }
        if (p.bottom !== undefined) {
            conf.bottom = p.bottom;
            conf.top = undefined;
        }

        if (p.top !== undefined) {
            conf.top = p.top;
        }

        return (
            <>
                {p.layer && (
                    <Positioner animation={"fade-in"} absoluteSettings={{ left: 0, top: 0, right: 0, bottom: 0 }}>
                        <div
                            style={{
                                backgroundColor: p.shadow ? "rgba(0, 0, 0, 0.15)" : "transparent",
                            }}
                            className="w-modal-container"
                            onClick={this.handleClose}

                        />
                    </Positioner>
                )}
                <Positioner
                    trackResize={this.props.recalculatePosition}
                    absoluteSettings={conf}
                    relativeTo={p.target}
                    relativeSettings={p.relativePositionConf}
                    animation={this.props.animation}
                >
                    <div
                        className={`w-modal`}
                        ref={(el) => (this.modalBody = el)}
                        onClick={(e) => e.stopPropagation()}
                        style={{ width: p.width ? p.width : "auto", height: p.height ? p.height : "auto" }}
                    >
                        {p.showHideLink && (
                            <a className="w-modal-close" style={{}} onClick={this.handleClose}>
                                <Icon name="ChromeClose" />
                            </a>
                        )}
                        {p.title && (
                            <div className="w-modal-title">
                                {p.icon && <Icon name={p.icon} />} {p.title}
                            </div>
                        )}
                        {this.props.show ? p.children : null}
                    </div>
                </Positioner>
            </>
        );
    }
}
