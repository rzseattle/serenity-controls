import React from "react";
import { Navbar } from "../../../../src/Navbar";
import { Meta, Story } from "@storybook/react/types-6-0";
import { IPanelProps, Panel } from "../../../../src/Panel";

export default {
    title: "Controls/Navbar",
    component: Navbar,
    argTypes: {},
} as Meta;

const Template: Story<IPanelProps> = (args) => {
    return (
        <div style={{ padding: 10, backgroundColor: "lightgrey" }}>
            <div style={{ backgroundColor: "white" }}>
                <Navbar>
                    <span>Option 1</span>
                    <span>Option 2</span>
                    <span>Option 3</span>
                </Navbar>
            </div>
        </div>
    );
};

export const Template1 = Template.bind({});
Template1.storyName = "Basic";
Template1.args = {};

const Template2: Story<IPanelProps> = (args) => {
    return (
        <div style={{ padding: 10, backgroundColor: "lightgrey" }}>
            <div style={{ backgroundColor: "white" }}>
                <Navbar>
                    <span>Option 1</span>
                    <a onClick={() => alert("clicked")}>Option 2 (clickable)</a>
                    <span>Option 3</span>
                </Navbar>
            </div>
        </div>
    );
};

export const Template3 = Template2.bind({});
Template3.storyName = "Clickable";
Template3.args = {};
