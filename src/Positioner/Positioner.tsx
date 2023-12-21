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
        left?: number | string;
        top?: number | string;
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
        if (y + itemRect.height > window.innerHeight && config.relativeToAt[0] === "bottom") {
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

interface IRect {
    top: string | number;
    left: string | number;
    bottom: string | number;
    right: string | number;
    width: string | number;
    height: string | number;
}

const Positioner = (inProps: IPositionerProps) => {
    const props: IPositionerProps = {
        relativeSettings: RelativePositionPresets.bottomMiddle,
        trackResize: false,
        trackPosition: true,
        animation: "none",
        absoluteSettings: null,
        ...inProps,
    };

    //to avoid blink when element is located at bottom for a moment
    const bottom = props.absoluteSettings?.bottom ?? "auto";
    const right = props.absoluteSettings?.right ?? "auto";
    const [position, setPosition] = useState<IRect>({
        top: props.absoluteSettings?.top ?? "auto",
        left: props.absoluteSettings?.left ?? "auto",
        bottom,
        right,
        width: "auto",
        height: "auto",
    });
    const [visible, setVisible] = useState(false);
    const [className, setClassName] = useState("");
    const element = useRef<HTMLDivElement>();

    let ticking = false;
    let lastKnownScrollYPosition = window.scrollY;
    let lastKnownScrollXPosition = window.scrollX;

    const calculatePosition = () => {
        if (props.absoluteSettings && Object.entries(props.absoluteSettings).length > 0) {
            if (props.absoluteSettings.top === "50%" && props.absoluteSettings.left === "50%") {
                const targetRect = element.current.getBoundingClientRect();
                setPosition((pos) => {
                    return {
                        ...pos,
                        top: `calc( 50% - ${targetRect.height / 2}px )`,
                        left: `calc( 50% - ${targetRect.width / 2}px )`,
                    };
                });
            }
            setVisible(true);
        }

        // @ts-ignore
        const relativeTo: HTMLElement | undefined | null =
            typeof inProps.relativeTo === "function" ? inProps.relativeTo() : props.relativeTo;

        if (relativeTo) {
            const sourceRect = relativeTo.getBoundingClientRect();
            const targetRect = element.current.getBoundingClientRect();

            const [left, top, width, height] = getRect(props.relativeSettings, sourceRect, targetRect);
            setPosition((pos) => ({
                ...pos,
                left: left + lastKnownScrollXPosition,
                top: top + lastKnownScrollYPosition,
                width,
                height,
            }));
            setVisible(true);
            setClassName("rotate-in-center");
        }
    };

    const resizeObserver = useRef<ResizeObserver>(
        new window.ResizeObserver((entries) => {
            for (const entry of entries) {
                if (entry.contentBoxSize) {
                    if (entry.contentRect.width > 0 && entry.contentRect.height > 0) {
                        calculatePosition();
                    }
                }
            }
        }),
    );

    useEffect(() => {
        calculatePosition();

        // @ts-ignore
        const relativeTo: HTMLElement =
            typeof inProps.relativeTo === "function" ? inProps.relativeTo() : props.relativeTo;
        const targetRect = element.current.getBoundingClientRect();
        if (relativeTo) {
            const track = () => {
                lastKnownScrollYPosition = window.scrollY;
                lastKnownScrollXPosition = window.scrollX;

                if (!ticking) {
                    window.requestAnimationFrame(function () {
                        const sourceRect = relativeTo.getBoundingClientRect();
                        const [left, top, width, height] = getRect(props.relativeSettings, sourceRect, targetRect);
                        setPosition((pos) => ({
                            ...pos,
                            left: left + lastKnownScrollXPosition,
                            top: top + lastKnownScrollYPosition,
                            width,
                            height,
                        }));
                        ticking = false;
                    });

                    ticking = true;
                }
            };
            document.addEventListener("scroll", track);

            return () => {
                document.removeEventListener("scroll", track);
            };
        } else {
            //console.log("---------");
            //console.log(element.current);
            if (element.current) {
                resizeObserver.current.observe(element.current);
            }
        }

        return () => {
            if (element.current) {
                //console.log("----X----");
                //console.log(element.current);
                resizeObserver.current.unobserve(element.current);
            }
        };
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
                                  ...position,
                                  visibility: visible ? "visible" : "hidden",
                              },
                              ...(props.relativeSettings.widthCalc && props.relativeSettings.widthCalc !== "none"
                                  ? {
                                        width: position.width,
                                        //height: position[3],
                                    }
                                  : {}),
                              zIndex: 4000, // why needed ?
                          }
                        : {
                              position: "absolute",
                              ...position,
                              visibility: visible ? "visible" : "hidden",
                              zIndex: 4000, // why needed ?
                          }
                }
            >
                {inProps.children}
            </div>
        </Portal>
    );
};

export { Positioner };
