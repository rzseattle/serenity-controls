import * as React from "react";
import { Portal } from "./Portal";
import { IPositionCalculatorOptions, PositionCalculator } from "../../lib/PositionCalculator";
import PrintJSON from "../../utils/PrintJSON";

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
    relativeTo?: () => HTMLElement | HTMLDivElement | HTMLSpanElement;
    relativeSettings?: IPositionCalculatorOptions;
    absoluteSettings?: IPositionCalculatorOptions;
}

interface IPositionerState {
    positionStyle: React.CSSProperties;
}

export class Positioner extends React.PureComponent<IPositionerProps, IPositionerState> {
    public static defaultProps = {
        relativeSettings: RelativePositionPresets.bottomMiddle,
    };
    public positionElement = React.createRef<HTMLDivElement>();

    private positionObserver: NodeJS.Timer;

    constructor(props = {}) {
        super(props);
        this.state = {
            positionStyle: {},
        };
    }

    private calculateRelativePosition() {
        const relativeTo = this.props.relativeTo() as HTMLElement;
        const tmp = relativeTo.getBoundingClientRect();
        const currentPosition = {
            top: tmp.top,
            left: tmp.left,
        };

        const calculatePos = () => {
            const calculator = new PositionCalculator(
                relativeTo,
                this.positionElement.current,
                this.props.relativeSettings,
            );
            const result = calculator.calculate();

            this.setState({
                positionStyle: result,
            });
        };
        calculatePos();

        this.positionObserver = setInterval(() => {
            const newPosition = relativeTo.getBoundingClientRect();
            if (newPosition.top != currentPosition.top || newPosition.left != currentPosition.left) {
                calculatePos();
            }
        }, 1000);
    }

    private calculateAbsolutePosition() {
        const data = this.positionElement.current.getBoundingClientRect();

        const calculatePos = () => {
            const calculator = new PositionCalculator(
                window.self.document.documentElement,
                this.positionElement.current,
                {
                    relativeToAt: "middle middle",
                    itemAt: "middle middle",
                },
            );

            const result = calculator.calculate();
            if (result.top < 0) {
                result.top = 0;
            }

            this.setState({
                positionStyle: result,
            });
        };
        calculatePos();

        this.positionObserver = setInterval(() => {
            const newPosition = this.positionElement.current.getBoundingClientRect();
            if (newPosition.width != data.width || newPosition.height != data.height) {
                calculatePos();
            }
        }, 1000);
    }

    public componentDidMount() {
        if (this.props.relativeTo !== undefined) {
            this.calculateRelativePosition();
        } else {
            this.calculateAbsolutePosition();
        }
    }

    public componentWillUnmount() {
        clearInterval(this.positionObserver);
    }

    public render() {
        const p = this.props;
        return (
            <Portal>
                <div ref={this.positionElement} style={{ ...this.state.positionStyle, position: "absolute" }}>
                    {this.props.children}
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
