import React from "react";
import { storiesOf } from "@storybook/react";
import { HeightAdjuster } from "../../../../../src/HeightAdjuster";

// @ts-ignore

const iframeCorrection = window.parent.document.getElementById("storybook-preview-iframe").getBoundingClientRect().top;


storiesOf("Helpers/HeightAdjuster", module)
    .add("Base", () => {
        return (
            <HeightAdjuster offsetTopCorrection={iframeCorrection}>
                <div style={{ height: "100%", backgroundColor: "yellow" }}>
                    This div will be always fit to end of window. Try to resize!
                </div>
            </HeightAdjuster>
        );
    })
    .add("With height feedback information", () => {
        return (
            <>
                <HeightAdjuster offsetTopCorrection={iframeCorrection}>
                    {(height: number) => {
                        return (
                            <div style={{ height: "100%", backgroundColor: "yellow" }}>
                                This div will be always fit to end of window. This div will be always fit to end of
                                window. Try to resize!<h2>{height}</h2>
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
                    <div style={{ height: 50, backgroundColor: "lightgray" }}>
                        Whole div have 200px height, this div have 50px of height
                    </div>
                    <HeightAdjuster
                        fitToParent={true}
                        // parent={() => {
                        //     return document.getElementsByClassName("helper-target")[0] as HTMLElement;
                        // }}
                    >
                        {(height: number) => {
                            return (
                                <div style={{ height, backgroundColor: "yellow" }}>
                                    Fit to parent
                                    <h2>{height}</h2>
                                </div>
                            );
                        }}
                    </HeightAdjuster>
                </div>
            </>
        );
    });
