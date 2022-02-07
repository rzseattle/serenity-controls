import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { Portal } from "../Portal";

import "./Positioner.sass";
import produce from "immer";

type PositionCoordinate = "top" | "right" | "middle" | "bottom" | "left";

export interface IPositionCalculatorOptions {
    itemAt: [PositionCoordinate, PositionCoordinate];
    relativeToAt: [PositionCoordinate, PositionCoordinate];
    offsetX?: number;
    offsetY?: number;
    // theSameWidth?: boolean;
    widthCalc?: "none" | "same" | "min" | "max";
}

interface IRelativePositionPresets {
    bottomMiddle: IPositionCalculatorOptions;
    topMiddle: IPositionCalculatorOptions;
    topRightCorner: IPositionCalculatorOptions;
    topLeftCorner: IPositionCalculatorOptions;
    bottomRightCorner: IPositionCalculatorOptions;
    bottomLeftCorner: IPositionCalculatorOptions;
    middleLeft: IPositionCalculatorOptions;
    middleRight: IPositionCalculatorOptions;
    bottomRight: IPositionCalculatorOptions;
    bottomLeft: IPositionCalculatorOptions;
    topRight: IPositionCalculatorOptions;
    topLeft: IPositionCalculatorOptions;
}

export const RelativePositionPresets: IRelativePositionPresets = {
    bottomMiddle: {
        relativeToAt: ["bottom", "middle"],
        itemAt: ["top", "middle"],
    },
    topMiddle: {
        relativeToAt: ["top", "middle"],
        itemAt: ["bottom", "middle"],
    },
    topRightCorner: {
        relativeToAt: ["top", "right"],
        itemAt: ["bottom", "left"],
    },
    topLeftCorner: {
        relativeToAt: ["top", "left"],
        itemAt: ["bottom", "right"],
    },
    bottomRightCorner: {
        relativeToAt: ["bottom", "right"],
        itemAt: ["top", "left"],
    },
    bottomLeftCorner: {
        relativeToAt: ["bottom", "left"],
        itemAt: ["top", "right"],
    },
    middleLeft: {
        relativeToAt: ["middle", "left"],
        itemAt: ["middle", "right"],
    },
    middleRight: {
        relativeToAt: ["middle", "right"],
        itemAt: ["middle", "left"],
    },
    bottomRight: {
        relativeToAt: ["bottom", "right"],
        itemAt: ["top", "right"],
    },
    bottomLeft: {
        relativeToAt: ["bottom", "left"],
        itemAt: ["top", "left"],
    },
    topRight: {
        relativeToAt: ["top", "right"],
        itemAt: ["bottom", "right"],
    },
    topLeft: {
        relativeToAt: ["top", "left"],
        itemAt: ["bottom", "left"],
    },
};

interface IPositionerProps {
    relativeTo?: HTMLElement | (() => HTMLElement);
    relativeSettings?: IPositionCalculatorOptions;

    absoluteSettings?: {
        left?: number;
        top?: number;
        right?: number;
        bottom?: number;
    };
    trackResize?: boolean;
    trackPosition?: boolean;
    animation?: string;

    container?: () => HTMLElement;
    children: JSX.Element;
}

const getRect = (
    config: IPositionCalculatorOptions,
    anchorRect: DOMRect,
    itemRect: DOMRect,
    recursionCounter = 0,
): [number, number, string | number, string | number] => {
    const [vertical, horizontal] = config.relativeToAt;
    const [verticalItem, horizontalItem] = config.itemAt;
    let x: number;
    let y: number;

    let width = itemRect.width;

    if (config.widthCalc === "same") {
        width = anchorRect.width;
    } else if (config.widthCalc === "min" && width < anchorRect.width) {
        width = anchorRect.width;
    } else if (config.widthCalc === "max" && width > anchorRect.width) {
        width = anchorRect.width;
    }

    if (horizontal == "left") {
        x = anchorRect.left;
    } else if (horizontal == "right") {
        x = anchorRect.left + anchorRect.width;
    } else if (horizontal == "middle") {
        x = anchorRect.left + anchorRect.width / 2;
    }

    if (vertical == "top") {
        y = anchorRect.top;
    } else if (vertical == "bottom") {
        y = anchorRect.top + anchorRect.height;
    } else if (vertical == "middle") {
        y = anchorRect.top + anchorRect.height / 2;
    }

    if (horizontalItem == "right") {
        x = x - width;
    } else if (horizontalItem == "middle") {
        x = x - width / 2;
    }

    if (verticalItem == "bottom") {
        y = y - itemRect.height;
    } else if (vertical == "middle") {
        y = y - itemRect.height / 2;
    }

    x += config.offsetX ? config.offsetX : 0;
    y += config.offsetY ? config.offsetY : 0;

    //manipulate coordinates to fit into window
    if (recursionCounter < 3) {
        let newConfig = null;
        if (x < 0 && config.relativeToAt[1] === "right") {
            newConfig = produce(newConfig ?? config, (draft) => {
                draft.relativeToAt[1] = "left";
                draft.itemAt[1] = "left";
            });
        }
        if (x + itemRect.width > window.innerWidth && config.relativeToAt[1] === "left") {
            newConfig = produce(newConfig ?? config, (draft) => {
                draft.relativeToAt[1] = "right";
                draft.itemAt[1] = "right";
            });
        }
        if (y < 0 && config.relativeToAt[1] === "top") {
            newConfig = produce(newConfig ?? config, (draft) => {
                draft.relativeToAt[0] = "bottom";
                draft.itemAt[0] = "top";
            });
        }
        if (y + itemRect.height > window.innerHeight && config.relativeToAt[1] === "bottom") {
            newConfig = produce(newConfig ?? config, (draft) => {
                draft.relativeToAt[0] = "top";
                draft.itemAt[0] = "bottom";
            });
        }

        if (newConfig !== null) {
            return getRect(newConfig, anchorRect, itemRect, ++recursionCounter);
        }
    }

    return [x, y, width, itemRect.height];
};

const Positioner = (inProps: IPositionerProps) => {
    const props: IPositionerProps = {
        relativeSettings: RelativePositionPresets.bottomMiddle,
        trackResize: false,
        trackPosition: true,
        animation: "none",
        absoluteSettings: null,
        ...inProps,
    };
    //const container = useRef<HTMLDivElement>();
    const [position, setRect] = useState<[number, number, string | number, string | number]>([0, 0, "auto", "auto"]);
    const [visible, setVisible] = useState(false);
    const [className, setClassName] = useState("");
    const element = useRef<HTMLDivElement>();

    let ticking = false;
    let lastKnownScrollYPosition = window.scrollY;
    let lastKnownScrollXPosition = window.scrollX;

    useEffect(() => {
        // @ts-ignore
        const relativeTo: HTMLElement =
            typeof inProps.relativeTo === "function" ? inProps.relativeTo() : props.relativeTo;

        // if (this.props.trackResize && this.resizeObserver === null) {
        //     this.resizeObserver = new ResizeObserver((entries, observer) => {
        //         for (const entry of entries) {
        //             const { left, top, width, height } = entry.contentRect;
        //             calculate();
        //         }
        //     });
        //     this.resizeObserver.observe(this.positionElement.current);
        // }

        if (relativeTo) {
            const sourceRect = relativeTo.getBoundingClientRect();
            const targetRect = element.current.getBoundingClientRect();

            const [left, top, width, height] = getRect(props.relativeSettings, sourceRect, targetRect);
            setRect([left + lastKnownScrollXPosition, top + lastKnownScrollYPosition, width, height]);
            setVisible(true);
            setClassName("rotate-in-center");

            const track = () => {
                lastKnownScrollYPosition = window.scrollY;
                lastKnownScrollXPosition = window.scrollX;

                if (!ticking) {
                    window.requestAnimationFrame(function () {
                        const sourceRect = relativeTo.getBoundingClientRect();
                        const [left, top, width, height] = getRect(props.relativeSettings, sourceRect, targetRect);
                        setRect([left + lastKnownScrollXPosition, top + lastKnownScrollYPosition, width, height]);
                        ticking = false;
                    });

                    ticking = true;
                }
            };
            document.addEventListener("scroll", track);
            return () => {
                document.removeEventListener("scroll", track);
            };
        }
    }, []);

    return (
        <Portal>
            <div
                ref={element}
                className={className}
                style={
                    !props.absoluteSettings || Object.entries(props.absoluteSettings).length === 0
                        ? {
                              ...{
                                  position: "absolute",
                                  left: position[0],
                                  top: position[1],
                                  visibility: visible ? "visible" : "hidden",
                              },
                              ...(props.relativeSettings.widthCalc && props.relativeSettings.widthCalc !== "none"
                                  ? {
                                        width: position[2],
                                        //height: position[3],
                                    }
                                  : {}),
                          }
                        : { position: "absolute", ...props.absoluteSettings }
                }
            >
                {inProps.children}
            </div>
        </Portal>
    );
};

export { Positioner };
