import React from "react";
import { storiesOf } from "@storybook/react";
import { Panel } from "../../../src/Panel";
import { Copyable } from "../../../src/Copyable";

storiesOf("Copyable", module)
    .add(
        "Base",

        () => (
            <Panel>
                <Copyable>This text to copy</Copyable>
            </Panel>
        ),
    )
    .add("Without content display", () => (
        <Panel>
            <h3>Without label</h3>
            <Copyable hideContent={true}>This text to copy</Copyable>
            <h3>With label</h3>
            <Copyable hideContent={true} label="Label">
                This text to copy
            </Copyable>
        </Panel>
    ))
    .add("Copy from string or promise", () => (
        <Panel>
            <h3>Copy from string</h3>
            <Copyable toCopy={"this is real text to copy"}>This displayed text</Copyable>
            <h3>Copy from promise</h3>
            <Copyable
                getToCopyString={
                    new Promise((resolve) => setTimeout(() => resolve("this is real text to copy from promise"), 2000))
                }
            >
                This displayed text
            </Copyable>
        </Panel>
    ));
