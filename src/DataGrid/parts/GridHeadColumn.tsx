import React, { useEffect, useRef, useState } from "react";
import { IGridColumn, IGridHeaderEvents } from "../interfaces/IGridColumn";
import { IGridHeaderEventCallback } from "../interfaces/IGridHeaderEventCallback";
import styles from "./GridHead.module.sass";
import { useGridContext } from "../config/GridContext";
import { IGridFilter } from "../interfaces/IGridFilter";
import { IFiltersChange } from "../interfaces/IFiltersChange";
import Trigger from "rc-trigger";
import { Positioner, Rect, RelativePositionPresets } from "../../Positioner";
import { Portal } from "../../Portal";

const GridHeadColumn = <T,>({
    column,
    isOrderable,
    onOrderChange,
    filters,
    onFiltersChange,
    orderDir,
}: {
    column: IGridColumn<T>;
    isOrderable: boolean;
    orderDir: null | "asc" | "desc";
    onOrderChange: () => void;
    filters: IGridFilter[];
    onFiltersChange: IFiltersChange;
}) => {
    const config = useGridContext();
    const cellProperties: React.HTMLAttributes<HTMLDivElement> = {};

    if (column.header?.events) {
        Object.entries(column.header.events).map(([key, val]) => {
            const event = key as keyof IGridHeaderEvents<T>;
            cellProperties[event] = (event) => {
                val.forEach((callback: IGridHeaderEventCallback<T>) => {
                    callback({
                        column,
                        event,
                    });
                });
            };
        });
    }

    if (isOrderable) {
        const currOnClick = cellProperties["onClick"];
        cellProperties["onClick"] = (event) => {
            onOrderChange();
            if (currOnClick) {
                currOnClick(event);
            }
        };
    }

    let child;
    if (column.header?.template !== undefined) {
        child = column.header.template({
            column,
        });
    } else {
        child = (
            <div
                className={"w-grid-header-cell-in " + (cellProperties.onClick ? "w-grid-header-cell-in-clickable" : "")}
            >
                {column.header?.caption ?? column.field}
                {isOrderable && orderDir !== null && (
                    <div className={"w-grid-header-cell-in-order"}>{config.order.icons[orderDir]}</div>
                )}
                {filters.length > 0 && (
                    <>
                        <div
                            className={"w-grid-header-cell-in-filter"}
                            onClick={(e) => {
                                e.stopPropagation();
                                onFiltersChange([
                                    ...filters.map((filter) => {
                                        filter.opened = !filter.opened;
                                        return filter;
                                    }),
                                ]);
                            }}
                        >
                            <Layer
                                popup={
                                    <div style={{ backgroundColor: "white", padding: 10, border: "solid 1px grey" }}>
                                        {filters[0].opened && (
                                            <div onClick={(e) => e.stopPropagation()}>
                                                {filters.map((filter) => {
                                                    const Component =
                                                        filter.component ?? config.filter.components[filter.filterType];
                                                    return (
                                                        <>
                                                            {Component ? (
                                                                <Component
                                                                    key={filter.field + "" + filter.applyTo}
                                                                    filter={filter}
                                                                    hide={() => {
                                                                        filter.opened = false;
                                                                        onFiltersChange([filter]);
                                                                    }}
                                                                    onApply={(value) => {
                                                                        filter.value = value;
                                                                        onFiltersChange([filter]);
                                                                    }}
                                                                />
                                                            ) : (
                                                                "No filter found"
                                                            )}
                                                        </>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                }
                                popupAlign={{
                                    points: ["tl", "bl"],
                                    offset: [0, 3],
                                }}
                            >
                                <a href="#">{config.filter.icons.filter} </a>
                            </Layer>
                        </div>
                        {filters[0].opened && (
                            <div onClick={(e) => e.stopPropagation()}>
                                {filters.map((filter) => {
                                    const Component = filter.component ?? config.filter.components[filter.filterType];
                                    return (
                                        <>
                                            {Component ? (
                                                <Component
                                                    key={filter.field + "" + filter.applyTo}
                                                    filter={filter}
                                                    hide={() => {
                                                        filter.opened = false;
                                                        onFiltersChange([filter]);
                                                    }}
                                                    onApply={(value) => {
                                                        filter.value = value;
                                                        onFiltersChange([filter]);
                                                    }}
                                                />
                                            ) : (
                                                "No filter found"
                                            )}
                                        </>
                                    );
                                })}
                            </div>
                        )}
                    </>
                )}
            </div>
        );

        return (
            <div className={styles.headerCell} {...cellProperties}>
                {child}
            </div>
        );
    }
};

const getRefPoint = (config: string, position: Rect): number[] => {
    const [vertical, horizontal] = config.split(" ");
    let x: number;
    let y: number;

    if (horizontal == "left") {
        x = position.left;
    } else if (horizontal == "right") {
        x = position.left + position.width;
    } else if (horizontal == "middle") {
        x = position.left + position.width / 2;
    }
    if (vertical == "top") {
        y = position.top;
    } else if (vertical == "bottom") {
        y = position.top + position.height;
    } else if (vertical == "middle") {
        y = position.top + position.height / 2;
    }

    return [x, y];
};

const Layer = ({ children, popup }: { children: JSX.Element | string; popup: JSX.Element }) => {
    const container = useRef<HTMLDivElement>();

    const [visible, setVisible] = useState(true);
    const [position, setPosition] = useState<[number, number]>([0, 0]);

    let ticking = false;
    let lastKnownScrollPosition = 0;

    useEffect(() => {
        const sourcePos = container.current.getBoundingClientRect();
        setPosition([sourcePos.left, sourcePos.top + sourcePos.height]);

        const track = () => {
            lastKnownScrollPosition = window.scrollY;

            if (!ticking) {
                window.requestAnimationFrame(function () {
                    const sourcePos = container.current.getBoundingClientRect();
                    setPosition([sourcePos.left, sourcePos.top + sourcePos.height + lastKnownScrollPosition]);
                    ticking = false;
                });

                ticking = true;
            }
        };
        document.addEventListener("scroll", track);
        return () => {
            document.removeEventListener("scroll", track);
        };
    }, []);

    return (
        <>
            <div
                style={{ display: "inline" }}
                ref={container}
                onClick={(e) => {
                    //e.stopPropagation();
                }}
            >
                {children}
            </div>
            {visible && (
                <Portal>
                    <div style={{ position: "absolute", left: position[0], top: position[1] }}>{popup}</div>
                </Portal>
            )}
        </>
    );
};

export default GridHeadColumn;
