import React from "react";
import { storiesOf } from "@storybook/react";
import { Copyable } from "../../../../src/Copyable";
import { LoadingIndicator } from "../../../../src/LoadingIndicator";
import { Meta, Story } from "@storybook/react/types-6-0";
import { IPanelProps } from "../../../../src/Panel";

export default {
    title: "Basic/Copyable",
    component: Copyable,
    argTypes: {},
} as Meta;

const Template: Story<IPanelProps> = (args) => {
    return (
        <div style={{ padding: 10 }}>
            <Copyable>This text to copy</Copyable>
        </div>
    );
};

export const Template1 = Template.bind({});
Template1.storyName = "Basic";
Template1.args = {};

const Template2: Story<IPanelProps> = (args) => {
    return (
        <div style={{ padding: 10 }}>
            <h3>Without label</h3>
            <Copyable hideContent={true}>This text to copy</Copyable>
            <h3>With label</h3>
            <Copyable hideContent={true} label="Label">
                This text to copy
            </Copyable>
        </div>
    );
};

export const Template3 = Template2.bind({});
Template3.storyName = "Without content display";
Template3.args = {};

const Template4: Story<IPanelProps> = (args) => {
    return (
        <div style={{ padding: 10 }}>
            <h3>Copy from string</h3>
            <Copyable toCopy={"this is real text to copy"}>This is displayed text</Copyable>
            <h3>Copy from promise</h3>
            <Copyable
                getToCopyString={
                    new Promise((resolve) => setTimeout(() => resolve("this is real text to copy from promise"), 2000))
                }
            >
                This displayed text
            </Copyable>
        </div>
    );
};

export const Template5 = Template4.bind({});
Template5.storyName = "Copy from string or promise";
Template5.args = {};
