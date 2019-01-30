import React from "react";
import { storiesOf } from "@storybook/react";

import { action, configureActions } from "@storybook/addon-actions";
import { CommandBar } from "../../../src/CommandBar";
const items = [
    {
        key: "f1",
        label: "Option 1",
        icon: "Add",
        onClick: () => {
            alert("x");
            action("element-clicked");
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
                icon: "Sync",
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
    {
        key: "f4",
        label: "Menu",
        subItems: [
            {
                key: "f4",
                label: "Sub Option 1",
                icon: "Sync",
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

const containerStyle = {
    backgroundColor: "grey",
    padding: 10,
};

storiesOf("CommandBar", module)
    .add("Base", () => {
        return (
            <div style={containerStyle}>
                <CommandBar items={items} />
            </div>
        );
    })
    .add("Right items", () => {
        return (
            <div style={containerStyle}>
                <CommandBar rightItems={items} />
            </div>
        );
    })
    .add("Search field", () => {
        return (
            <div style={containerStyle}>
                <CommandBar items={items} isSearchBoxVisible={true} />
            </div>
        );
    });
