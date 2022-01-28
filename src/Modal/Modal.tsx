import React from "react";
import "./Modal.sass";
import { IPositionCalculatorOptions, Positioner, RelativePositionPresets } from "../Positioner";
import { HotKeys } from "../HotKeys";
import { Key } from "ts-key-enum";
import { CommonIcons } from "../lib/CommonIcons";

export interface IModalProps {
    show: boolean;

    onShow?(): any;

    onHide?(): any;

    container?(): HTMLElement;

    recalculatePosition?: boolean;
    showHideLink?: boolean;
    title?: string;
    icon?: React.JSXElementConstructor<any>;
    shadow?: boolean;
    layer?: boolean;
    width?: string | number;
    height?: string | number;
    position?: {
        top?: string | number;
        left?: string | number;
        bottom?: string | number;
        right?: string | number;
    };
    className?: string;
    children: any;
    orientation?: string;
    relativeTo?(): HTMLElement;
    relativeSettings?: IPositionCalculatorOptions;
    animation?: string;

    onOrientationChange?(type: string): any;
}

export class Modal extends React.PureComponent<IModalProps> {
    public modalBody: HTMLDivElement;

    public static defaultProps = {
        show: false,

        recalculatePosition: true,
        shadow: true,
        layer: true,
        animation: "fade-in",
    };
    private modalContainer: HTMLDivElement;

    constructor(props: IModalProps) {
        super(props);
    }

    public handleClose = (e: React.MouseEvent) => {
        if (e) {
            const target = e.target as HTMLDivElement;
            const rect = target.getBoundingClientRect();
            const scrollbarWidth = rect.width - target.clientWidth;
            const relativeMousePos = e.clientX - rect.left;
            //clicked outside of scroll bar
            if (!(rect.width - relativeMousePos < scrollbarWidth)) {
                if (e !== null) {
                    e.stopPropagation();
                    e.nativeEvent.stopImmediatePropagation();
                }
            }
        }
        if (this.props.onHide) {
            this.props.onHide();
        }
    };

    public handleShow = () => {
        if (this.props.onShow) {
            document.body.style.overflow = "hidden";
            this.props.onShow();
        }
    };

    public UNSAFE_componentWillReceiveProps(nextProps: IModalProps) {
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

        let conf: any = {
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
        };
        if (p.position !== undefined) {
            conf = p.position;
            conf.transform = null;
        }

        const relativeSettings = p.relativeSettings;
        if (p.relativeTo) {
            conf = {};
        }

        return (
            <>
                {p.layer && (
                    <Positioner animation={"fade-in"} absoluteSettings={{ left: 0, top: 0, right: 0, bottom: 0 }}>
                        <div
                            style={{
                                backgroundColor: p.shadow ? "rgba(0, 0, 0, 0.15)" : "transparent",
                            }}
                            ref={(el) => (this.modalContainer = el)}
                            className="w-modal-container"
                            onMouseDown={this.handleClose}
                            onClick={(e) => e.stopPropagation()}
                        />
                    </Positioner>
                )}

                <Positioner
                    trackResize={this.props.recalculatePosition}
                    absoluteSettings={conf}
                    relativeTo={p.relativeTo}
                    relativeSettings={relativeSettings}
                    animation={this.props.animation}
                    container={
                        p.layer
                            ? () => {
                                  return this.modalContainer;
                              }
                            : undefined
                    }
                >
                    <HotKeys
                        actions={[
                            {
                                key: Key.Escape,
                                handler: () => {
                                    this.handleClose(null);
                                },
                            },
                        ]}
                        captureInput={true}
                        observeFromInput={[Key.Escape]}
                        autofocus={true}
                    >
                        <div
                            className={p.className === undefined ? "w-modal" : p.className}
                            ref={(el) => (this.modalBody = el)}
                            onClick={(e) => e.stopPropagation()}
                            style={{ width: p.width ? p.width : "auto", height: p.height ? p.height : "auto" }}
                            onMouseDown={(e) => {
                                e.stopPropagation();
                            }}
                        >
                            {p.showHideLink && (
                                <a className="w-modal-close" style={{}} onClick={this.handleClose}>
                                    <CommonIcons.close />
                                </a>
                            )}
                            {p.title && (
                                <div className="w-modal-title">
                                    {p.icon && <p.icon />} {p.title}
                                </div>
                            )}
                            {this.props.show ? p.children : null}
                        </div>
                    </HotKeys>
                </Positioner>
            </>
        );
    }
}
