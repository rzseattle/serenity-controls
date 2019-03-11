import React from "react";
import { storiesOf } from "@storybook/react";

// @ts-ignore
import { withKnobs, radios } from "@storybook/addon-knobs";
import { Panel } from "../../../src/Panel";
import { TabPane, Tabs } from "../../../src/Tabs";
import { Placeholder } from "../../../src/Placeholder";
import { Navbar } from "../../../src/Navbar";

storiesOf("Navbar", module)
    .add("Base", () => (
        <Panel>
            <Navbar>
                <span>Option 1</span>
                <span>Option 2</span>
                <span>Option 3</span>
            </Navbar>
        </Panel>
    ))
    .add("Onclick", () => (
        <Panel>
            <Navbar>
                <span>Option 1</span>
                <a onClick={() => alert("clicked")}>Option 2</a>
                <span>Option 3</span>
            </Navbar>
        </Panel>
    ));
