import * as React from "react";
import { LoadingIndicator } from "../../../../src/LoadingIndicator";
import { IPanelProps, Panel } from "../../../../src/Panel";
import { Meta, Story } from "@storybook/react/types-6-0";

export default {
    title: "Basic/Loading indicator",
    component: LoadingIndicator,
    argTypes: {},
} as Meta;

const Template: Story<IPanelProps> = (args) => {
    return (
        <div style={{ padding: 10 }}>
            <LoadingIndicator {...args} />
        </div>
    );
};

export const Template1 = Template.bind({});
Template1.storyName = "Basic";
Template1.args = {};

export const Template2 = Template.bind({});
Template2.storyName = "With text";
Template2.args = {
    text: "Data is loading now",
};

const TemplateSize: Story<IPanelProps> = (args) => {
    return (
        <div style={{ padding: 10 }}>
            <>
                <div style={{ padding: 40, textAlign: "center" }}>
                    <h4>Size 1</h4>
                    <LoadingIndicator />
                    <h4>Size 2</h4>
                    <LoadingIndicator size={2} />
                    <h4>Size 3</h4>
                    <LoadingIndicator size={3} />
                    <h4>Size 4</h4>
                    <LoadingIndicator size={4} />
                </div>
            </>
        </div>
    );
};

export const Template3 = TemplateSize.bind({});
Template3.storyName = "Sizes";
Template3.args = {};
