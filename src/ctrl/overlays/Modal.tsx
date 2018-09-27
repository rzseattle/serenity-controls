import Icon from "../Icon";

import React from "react";

import "./Modal.sass";
import ResizeObserver from "resize-observer-polyfill";
import { Portal } from "./Portal";
import ReactDOM from "react-dom";

export interface IModalProps {
    show: boolean;

    onShow?(): any;

    onHide?(): any;

    container?(): HTMLElement;

    target?(): HTMLElement;

    positionOffset?: number;
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
    animate?: boolean;
    animation?: string;

    onOrientationChange?(type: string): any;
}

export class Modal extends React.Component<IModalProps> {
    public el: HTMLElement;
    public isObserved: boolean;
    public modalBody: HTMLDivElement;
    public animationName: string;
    public modalHandler: any;

    public static defaultProps = {
        show: false,
        positionOffset: 5,
        recalculatePosition: true,
        shadow: true,
        layer: true,
        animate: false,
        animation: "fadeIn",
    };

    constructor(props: IModalProps) {
        super(props);
        this.state = {
            modalStyle: {
                opacity: 0,
            },
        };
        this.el = document.createElement("div");
    }

    public handleClose = () => {
        if (this.props.onHide) {
            this.props.onHide();
            this.animationName = "";
        }
    };

    public handleShow = () => {
        this.calculatePos();
        if (this.props.onShow) {
            this.props.onShow();
        }

        const ro = new ResizeObserver((entries, observer) => {
            for (const entry of entries) {
                const { left, top, width, height } = entry.contentRect;

                if (this.props.recalculatePosition) {
                    this.calculatePos();
                }
            }
        });

        ro.observe(ReactDOM.findDOMNode(this.modalBody) as Element);
        this.isObserved = true;

        /* if (false) {

             let s = {opacity: 1, top: 49};
             const node = ReactDOM.findDOMNode(this.modalBody);
             TweenLite.to(s, 0.2, {
                 opacity: 1,
                 top: 50,
                 ease: Power4.easeInOut,
                 onUpdate: () => {
                     node.style['opacity'] = s.opacity;
                     node.style['top'] = s.top + '%';

                 }
             });
         }*/
    };

    public calculatePosition() {
        this.calculatePos();
    }

    public componentWillReceiveProps(nextProps: IModalProps) {
        if (this.props.show == false && nextProps.show == true) {
            this.animationName = this.props.animation;
            this.handleShow();
        }
    }

    public componentDidMount() {
        if (this.props.show) {
            this.handleShow();
        }
    }

    public componentDidUpdate() {
        if (this.props.show) {
            this.calculatePos();
        }
    }

    public calculatePos() {
        const container = this.props.container ? this.props.container() : document.body;
        const containerSize = container.getBoundingClientRect();

        const node = ReactDOM.findDOMNode(this.modalBody) as HTMLElement;

        if (node) {
            const data = node.getBoundingClientRect();

            if (this.props.target) {
                const target = this.props.target();
                const targetData = target.getBoundingClientRect();
                let left = targetData.left;
                if (left + data.width > containerSize.width) {
                    left = containerSize.width - data.width - this.props.positionOffset;
                }
                let top = targetData.top + targetData.height + this.props.positionOffset;
                if (
                    top + data.height > containerSize.height ||
                    (this.props.orientation && this.props.orientation.indexOf("top") != -1)
                ) {
                    // top = containerSize.height - data.height - this.props.positionOffset;
                    top = targetData.top - data.height - this.props.positionOffset;
                    if (this.props.onOrientationChange) {
                        this.props.onOrientationChange("top");
                    }
                }

                node.style.top = top + "px";
                node.style.left = left + "px";
            } else {
                const { left, right, top, bottom } = this.props;

                let x: number = Math.round(Math.min(data.width / 2, window.innerWidth / 2 - 5));
                let y = Math.round(Math.min(data.height / 2, window.innerHeight / 2 - 5));
                x = this.props.left != undefined || this.props.right != undefined ? 0 : x;
                y = this.props.top != undefined || this.props.bottom != undefined ? 0 : y;

                if (left == undefined && right == undefined && top == undefined && bottom == undefined) {
                    node.style.transform = `translate(-${x}px, -${y}px)`;
                    node.style.top = "50%";
                    node.style.left = "50%";
                } else {
                    node.style.margin = "0 auto";
                    if (this.props.left != undefined) {
                        node.style.left = this.props.left + (Number.isNaN(this.props.left as any) ? "" : "px");
                    }

                    if (this.props.right != undefined) {
                        node.style.right = this.props.right + (Number.isNaN(this.props.right as any) ? "" : "px");
                    }
                    if (this.props.left == undefined && this.props.right == undefined) {
                        node.parentNode.style.justifyContent = "center";
                        node.parentNode.style.alignItems = "center";
                    }
                    // }

                    if (this.props.top != undefined) {
                        node.style.top = this.props.top + (Number.isNaN(this.props.top as any) ? "" : "px");
                    }
                    if (this.props.bottom != undefined) {
                        node.style.bottom = this.props.bottom + (Number.isNaN(this.props.bottom as any) ? "" : "px");
                    }

                    if (this.props.top == undefined && this.props.bottom == undefined) {
                        node.style.top = "50%";
                    }
                }
            }
        }
    }

    public shouldComponentUpdate(nextProps: IModalProps) {
        // kiedy jest pokazany lub zmienia stan z pokazanego w schowany
        return nextProps.show || (this.props.show && !nextProps.show);
    }

    public render() {
        const p = this.props;
        return (
            <Portal>
                <div
                    ref={(el) => (this.modalHandler = el)}
                    style={{
                        display: p.animate && p.show ? "flex" : p.show ? "block" : "unset",
                        visibility: p.animate && p.show ? "visible" : p.show ? "visible" : "hidden",
                        backgroundColor: p.shadow ? "rgba(0, 0, 0, 0.15)" : "transparent",
                    }}
                    className={
                        (p.layer ? "w-modal-container " : "") +
                            (p.animate && p.show ? "animate-fadeIn " : "") +
                            p.className || ""
                    }
                    onClick={this.handleClose}
                >
                    <div
                        className={`w-modal animate-${this.animationName}`}
                        ref={(el) => (this.modalBody = el)}
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            width: p.width ? p.width : "auto",
                            height: p.height ? p.height : "auto",
                        }}
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
                </div>
            </Portal>
        );
    }
}
