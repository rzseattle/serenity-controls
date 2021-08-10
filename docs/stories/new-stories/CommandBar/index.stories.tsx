import React from "react";

import { CommandBar } from "../../../../src/CommandBar";

import { Meta, Story } from "@storybook/react/types-6-0";
import { CommonIcons } from "../../../../src/lib/CommonIcons";
const items = [
    {
        key: "f1",
        label: "Option 1",
        icon: "Add",
        onClick: () => {
            alert("clicked");

        },
    },
    {
        key: "f2",
        label: "Option 2",
        icon: "Add",
    },
    {
        key: "f3",
        label: "Another option",
        subItems: [
            {
                key: "f4",
                label: "Sub Option 1",
                icon: CommonIcons.refresh,
                onClick: () => {
                    alert("clicked");
                },
            },
            {
                key: "f5",
                label: "Sub Option 2",
                icon: "Add",
                onClick: () => {
                    alert("clicked");
                },
            },
            {
                key: "f6",
                label: "This is option with very very very long text inside",
                icon: CommonIcons.delete,
                onClick: () => {
                    alert("clicked");
                },
            },
        ],
    },
    {
        key: "f4",
        label: "Menu",
        subItems: [
            {
                key: "f4",
                label: "Sub Option 1",
                icon: "Sync",
                onClick: () => {
                    alert("clicked");
                },
            },
            {
                key: "f5",
                label: "Sub Option 2",
                icon: "Add",
                onClick: () => {
                    alert("clicked");
                },
            },
            {
                key: "f6",
                label: "This is option with very very very long text inside",
                icon: "Delete",
                onClick: () => {
                    alert("clicked");
                },
            },
        ],
    },
];

export default {
    title: "Basic/Command bar",
    component: CommandBar,
    argTypes: {},
} as Meta;

const Template: Story<any> = (args) => {
    return (
        <div
            style={{
                backgroundColor: "grey",
                padding: 10,
            }}
        >
            <CommandBar {...args} />
        </div>
    );
};

export const Template1 = Template.bind({});
Template1.storyName = "Basic";
Template1.args = {
    items,
};

export const Template2 = Template.bind({});
Template2.storyName = "Right items";
Template2.args = {
    rightItems: items,
};

export const Template3 = Template.bind({});
Template3.storyName = "Search field";
Template3.args = {
    items: items,
    isSearchBoxVisible: true,
};
