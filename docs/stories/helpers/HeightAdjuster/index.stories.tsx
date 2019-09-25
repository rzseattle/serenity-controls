import React from "react";
import { storiesOf } from "@storybook/react";
import { Panel } from "../../../../src/Panel";
import { HeightAdjuster } from "../../../../src/HeightAdjuster";

// @ts-ignore

storiesOf("Helpers/HeightAdjuster", module)
    .add("Base", () => {
        return (
            <HeightAdjuster>
                <div style={{ height: "100%", backgroundColor: "yellow" }}>
                    This div will be always fit to end of window. Try to resize!
                </div>
            </HeightAdjuster>
        );
    })
    .add("With height feedback information", () => {
        return (
            <>
                <HeightAdjuster>
                    {(height: number) => {
                        return (
                            <div style={{ height: "100%", backgroundColor: "yellow" }}>
                                This div will be always fit to end of window. Try to resize!
                                <h2>{height}</h2>
                            </div>
                        );
                    }}
                </HeightAdjuster>
            </>
        );
    })

    .add("Parent element", () => {
        return (
            <>
                <div style={{ height: "200px" }} className={"helper-target"}>
                    <HeightAdjuster
                        parent={() => {
                            return document.getElementsByClassName("helper-target")[0];
                        }}
                        xxxxx={() => {}}
                    >
                        {(height: number) => {
                            return (
                                <div style={{ height: "100%", backgroundColor: "yellow" }}>
                                    This div will be always fit to end of window. Try to resize!
                                    <h2>{height}</h2>
                                </div>
                            );
                        }}
                    </HeightAdjuster>
                </div>
            </>
        );
    });
