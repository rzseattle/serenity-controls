import React from "react";
import { storiesOf } from "@storybook/react";

import { Panel } from "../../../../src/Panel";

import Tooltip from "../../../../src/Tooltip/Tooltip";
import { RelativePositionPresets } from "../../../../src/Positioner";

import "./Tooltip.stories.sass";

storiesOf("Tooltip", module)
    .add("Base", () => {
        return (
            <Panel>
                Lorem ipsum dolor sit amet,{" "}
                <Tooltip content={"This is tooltip content"}>
                    <a style={{ color: "red", fontWeight: "bold" }}>consectetur</a>
                </Tooltip>{" "}
                adipiscing elit. Donec vestibulum molestie nibh eget aliquet. Morbi a magna molestie, laoreet mi vitae,
                suscipit mi. Sed pulvinar massa eros, faucibus volutpat tellus placerat ut.
            </Panel>
        );
    })
    .add("Display template", () => {
        const userData = {
            id: 1,
            name: "Leanne Graham",
            username: "Bret",
            email: "Sincere@april.biz",
            address: {
                street: "Kulas Light",
                suite: "Apt. 556",
                city: "Gwenborough",
                zipcode: "92998-3874",
                geo: {
                    lat: "-37.3159",
                    lng: "81.1496",
                },
            },
        };
        return (
            <Panel>
                Sed pulvinar massa eros, faucibus volutpat tellus placerat ut.{" "}
                <Tooltip
                    theme="light"
                    content={userData}
                    loadingIndicatorText="Data is loading"
                    template={(data) => {
                        return (
                            <>
                                <div style={{ borderBottom: "solid 1px", paddingBottom: 4, marginBottom: 4 }}>
                                    <b>{data.name}</b>
                                </div>

                                <small>
                                    {data.address.street}
                                    <br />
                                    {data.address.zipcode}
                                    <br />
                                </small>
                            </>
                        );
                    }}
                >
                    <a style={{ color: "red", fontWeight: "bold" }}>Proin</a>
                </Tooltip>{" "}
                dictum mauris quis risus pretium varius.
            </Panel>
        );
    })
    .add("Data from promise", () => {
        const promise = new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    id: 1,
                    name: "Leanne Graham",
                    username: "Bret",
                    email: "Sincere@april.biz",
                    address: {
                        street: "Kulas Light",
                        suite: "Apt. 556",
                        city: "Gwenborough",
                        zipcode: "92998-3874",
                        geo: {
                            lat: "-37.3159",
                            lng: "81.1496",
                        },
                    },
                });
            }, 2000);
        });
        return (
            <Panel>
                Sed pulvinar massa eros, faucibus volutpat tellus placerat ut.{" "}
                <Tooltip
                    theme="light"
                    promise={() => promise}
                    loadingIndicatorText="Data is loading"
                    template={(data) => {
                        return (
                            <>
                                <div style={{ borderBottom: "solid 1px", paddingBottom: 4, marginBottom: 4 }}>
                                    <b>{data.name}</b>
                                </div>
                                <small>
                                    {data.address.street}
                                    <br />
                                    {data.address.zipcode}
                                    <br />
                                </small>
                            </>
                        );
                    }}
                >
                    <a style={{ color: "red", fontWeight: "bold" }}>Proin</a>
                </Tooltip>{" "}
                dictum mauris quis risus pretium varius.
            </Panel>
        );
    })
    .add("Activation", () => {
        return (
            <Panel>
                <Tooltip content={"This is tooltip content"}>
                    <a style={{ color: "red" }}>on mouse over (default)</a>
                </Tooltip>
                <hr />
                <Tooltip content={"This is tooltip content"} activation="click">
                    <a style={{ color: "red" }}>on click</a>
                </Tooltip>
            </Panel>
        );
    })

    .add("Theming", () => {
        return (
            <Panel>
                <Tooltip content={"This is tooltip content"}>
                    <a style={{ color: "red" }}>dark (default)</a>
                </Tooltip>
                <hr />
                <Tooltip content={"This is tooltip content"} theme="light">
                    <a style={{ color: "red" }}>light</a>
                </Tooltip>
                <hr />
                <Tooltip content={"This is tooltip content"} layerClass={"custom-tooltip-class"}>
                    <a style={{ color: "red" }}>custom class</a>
                </Tooltip>
            </Panel>
        );
    })
    .add("Position change", () => {
        return (
            <Panel>
                <p>Position could be changes by IPositionCalculatorOptions</p>
                <div style={{ textAlign: "center" }}>
                    <Tooltip content={"This is tooltip content"} relativeSettings={RelativePositionPresets.bottomLeft}>
                        <a style={{ color: "red" }}>bottom left (default)</a>
                    </Tooltip>
                    <hr />
                    <Tooltip
                        content={"This is tooltip content"}
                        relativeSettings={{ ...RelativePositionPresets.middleLeft, offsetX: -10 }}
                    >
                        <a style={{ color: "red" }}>middle left</a>
                    </Tooltip>
                    <hr />
                    <Tooltip content={"This is tooltip content"} relativeSettings={RelativePositionPresets.topMiddle}>
                        <a style={{ color: "red" }}>top middle </a>
                    </Tooltip>
                    <hr />
                    <Tooltip
                        content={"This is tooltip content"}
                        relativeSettings={{ ...RelativePositionPresets.middleRight, offsetX: 10 }}
                    >
                        <a style={{ color: "red" }}>middle right </a>
                    </Tooltip>
                </div>
            </Panel>
        );
    });
