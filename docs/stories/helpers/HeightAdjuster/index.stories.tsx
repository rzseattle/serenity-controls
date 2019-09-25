import React from "react";
import { storiesOf } from "@storybook/react";
import { Panel } from "../../../../src/Panel";

// @ts-ignore

storiesOf("Helpers/HeightAdjuster", module)
    .add("Base", () => {
        return <Panel>   <HeightAdjuster></HeightAdjuster> letst try to do it</Panel>;
    })
    .add("Size", () => {
        return (
            <>
                <br />
            </>
        );
    });
