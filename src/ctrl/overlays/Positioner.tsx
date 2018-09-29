import * as React from "react";
import { Portal } from "./Portal";
import { IPositionCalculatorOptions, PositionCalculator } from "../../lib/PositionCalculator";
import { deepCopy, deepIsEqual } from "../../lib/JSONTools";
import ResizeObserver from "resize-observer-polyfill";

import "./Positioner.sass";

interface IRelativePositionPresets {
    bottomMiddle: IPositionCalculatorOptions;
    topMiddle: IPositionCalculatorOptions;
    topRightCorner: IPositionCalculatorOptions;
    topLeftCorner: IPositionCalculatorOptions;
    bottomRightCorner: IPositionCalculatorOptions;
    bottomLeftCorner: IPositionCalculatorOptions;
    leftMiddle: IPositionCalculatorOptions;
    rightMiddle: IPositionCalculatorOptions;
    bottomRight: IPositionCalculatorOptions;
    bottomLeft: IPositionCalculatorOptions;
    topRight: IPositionCalculatorOptions;
    topLeft: IPositionCalculatorOptions;
}

export const RelativePositionPresets: IRelativePositionPresets = {
    bottomMiddle: {
        relativeToAt: "bottom middle",
        itemAt: "top middle",
    },
    topMiddle: {
        relativeToAt: "top middle",
        itemAt: "bottom middle",
    },
    topRightCorner: {
        relativeToAt: "top right",
        itemAt: "bottom left",
    },
    topLeftCorner: {
        relativeToAt: "top left",
        itemAt: "bottom right",
    },
    bottomRightCorner: {
        relativeToAt: "bottom right",
        itemAt: "top left",
    },
    bottomLeftCorner: {
        relativeToAt: "bottom left",
        itemAt: "top right",
    },
    leftMiddle: {
        relativeToAt: "middle left",
        itemAt: "middle right",
    },
    rightMiddle: {
        relativeToAt: "middle right",
        itemAt: "middle left",
    },

    bottomRight: {
        relativeToAt: "bottom right",
        itemAt: "top right",
    },
    bottomLeft: {
        relativeToAt: "bottom left",
        itemAt: "top left",
    },
    topRight: {
        relativeToAt: "top right",
        itemAt: "bottom right",
    },
    topLeft: {
        relativeToAt: "top left",
        itemAt: "bottom left",
    },
};

interface IPositionerProps {
    relativeTo?: "cursor" | (() => HTMLElement | HTMLDivElement | HTMLSpanElement);
    relativeSettings?: IPositionCalculatorOptions;

    absoluteSettings?: {
        left?: number;
        top?: number;
        right?: number;
        bottom?: number;
    };
    trackResize?: boolean;
    animation?: string;
}

export class Positioner extends React.PureComponent<IPositionerProps> {
    public static defaultProps = {
        relativeSettings: RelativePositionPresets.bottomMiddle,
        trackResize: false,
        animation: "none",
    };
    public positionElement: HTMLDivElement; // = React.createRef<HTMLDivElement>();

    private positionObserver: number = null;
    private resizeObserver: ResizeObserver = null;
    private readonly mouseCursorObserver: (e: MouseEvent) => any;
    private mouseCursorCoords: ClientRect = {
        height: 10,
        width: 10,
        bottom: 10,
        right: 10,
        left: 0,
        top: 0,
    };

    constructor(props: IPositionerProps) {
        super(props);

        if (props.relativeTo === "cursor") {
            this.mouseCursorObserver = (e: MouseEvent) => {
                this.mouseCursorCoords = {
                    height: 1,
                    width: 1,
                    bottom: e.y + 1,
                    right: e.x + 1,
                    left: e.x,
                    top: e.y,
                };
            };

            document.addEventListener("mousemove", this.mouseCursorObserver, false);
        }
    }

    public componentDidMount() {
        this.calculatePosition();
    }
    public componentWillUnmount() {
        clearInterval(this.positionObserver);
        if (this.mouseCursorObserver !== undefined) {
            document.removeEventListener("mousemove", this.mouseCursorObserver, false);
        }
        if (this.resizeObserver !== null) {
            this.resizeObserver.unobserve(this.positionElement);
        }
    }

    public componentDidUpdate(prevProps: Readonly<IPositionerProps>, prevState: any, snapshot?: any): void {
        this.calculatePosition();
    }

    /*      public shouldComponentUpdate(nextProps: IPositionerProps, nextState: any) {
        return false;
        let should = false;
        if (this.props.relativeTo !== undefined) {
            should = should || !deepIsEqual(nextProps.relativeSettings, this.props.relativeSettings);
        } else {
            should = should || !deepIsEqual(nextProps.absoluteSettings, this.props.absoluteSettings);
        }

        return should;
    }*/

    public applyStyles = (styles: React.CSSProperties) => {
        for (const name in styles) {
            // if (this.positionElement.style.hasOwnProperty(name)) {
            // @ts-ignore
            this.positionElement.style[name] = styles[name] + "px";
            // }
        }
    };

    private calculatePosition() {
        const calculate = () => {
            if (this.props.relativeTo !== undefined) {
                this.calculateRelativePosition();
            } else {
                this.calculateAbsolutePosition();
            }
        };
        calculate();

        if (this.props.trackResize && this.resizeObserver === null) {
            this.resizeObserver = new ResizeObserver((entries, observer) => {
                for (const entry of entries) {
                    const { left, top, width, height } = entry.contentRect;
                    calculate();
                }
            });
            this.resizeObserver.observe(this.positionElement);
        }
    }

    private calculateRelativePosition() {
        const getCurrentCoordinates = () => {
            return this.props.relativeTo == "cursor"
                ? this.mouseCursorCoords
                : (this.props.relativeTo() as HTMLElement).getBoundingClientRect();
        };

        let currentPosition = getCurrentCoordinates();

        const calculatePos = () => {
            currentPosition = getCurrentCoordinates();
            const calculator = new PositionCalculator(
                currentPosition,
                this.positionElement,
                this.props.relativeSettings,
            );
            const result = calculator.calculate();

            this.applyStyles(result);
        };
        calculatePos();

        if (this.positionObserver === null) {
            this.positionObserver = window.setInterval(() => {
                // Last tick after unmount problem reference is empty - so we need if
                if (this.positionElement == null) {
                    return;
                }
                const newPosition = getCurrentCoordinates();

                if (newPosition.top != currentPosition.top || newPosition.left != currentPosition.left) {
                    calculatePos();

                    currentPosition = deepCopy(newPosition);
                }
            }, this.props.relativeTo == "cursor" ? 10 : 1000);
        }
    }

    private calculateAbsolutePosition() {
        const getActualCoordinades = () => ({
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            width: window.innerWidth,
            height: window.innerHeight,
        });

        const calculatePos = () => {
            const calculator = new PositionCalculator(getActualCoordinades(), this.positionElement, {
                relativeToAt: "middle middle",
                itemAt: "middle middle",
            });

            const result = { ...calculator.calculate(), ...this.props.absoluteSettings };
            if (result.top < 0) {
                result.top = 0;
            }

            this.applyStyles(result);
        };

        calculatePos();

        let actual = getActualCoordinades();

        this.positionObserver = window.setInterval(() => {
            if (this.positionElement == null) {
                return;
            }
            const newPosition = getActualCoordinades();
            if (newPosition.width != actual.width || newPosition.height != actual.height) {
                calculatePos();
                actual = newPosition;
            }
        }, 1000);

        return;

        const data = this.positionElement.getBoundingClientRect();

        const calculatePos1 = () => {
            const calculator = new PositionCalculator(window.self.document.documentElement, this.positionElement, {
                relativeToAt: "middle middle",
                itemAt: "middle middle",
            });

            const result = calculator.calculate();
            if (result.top < 0) {
                result.top = 0;
            }

            this.applyStyles(result);
            /*this.setState({
                positionStyle: result,
            });*/
        };
        calculatePos();

        this.positionObserver = window.setInterval(() => {
            if (this.positionElement == null) {
                return;
            }
            const newPosition = this.positionElement.getBoundingClientRect();
            if (newPosition.width != data.width || newPosition.height != data.height) {
                calculatePos();
            }
        }, 1000);
    }

    public render() {
        return (
            <Portal>
                <div
                    className="w-positioner"
                    ref={(el) => {
                        this.positionElement = el;
                    }}
                >
                    <div className={"w-position-animation-" + this.props.animation}>{this.props.children}</div>
                </div>
            </Portal>
        );
    }
}

export const AbsolutePositionPresets = {
    center: { top: "auto", left: "auto" },
    fullTop: { top: "auto", left: "auto" },
    top: { top: "auto", left: "auto" },
};