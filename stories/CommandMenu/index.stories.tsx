import React from "react";
import { storiesOf } from "@storybook/react";

import { CommandBar } from "../../src/CommandBar";
import { CommandMenu } from "../../src/CommandMenu";
import "./CommandMenu.stories.sass";

const containerStyle = {
    padding: 10,
};

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
        onClick: () => {
            alert("clicked");
        },
    },
    {
        key: "f3",
        label: "Another option",
        icon: "Airplane",
        onClick: () => {
            alert("clicked");
        },
    },
];

storiesOf("CommandMenu", module).add("Base", () => {
    return (
        <div style={containerStyle}>
            <CommandMenu items={items}>
                {(opened) => <a className={"btn btn-primary " + (opened && "hover")}>Click to menu</a>}
            </CommandMenu>
            <hr />
            <CommandMenu items={items} activation={"hover"}>
                {(opened) => <a className={"btn btn-primary " + (opened && "hover")}>Hover to menu</a>}
            </CommandMenu>
        </div>
    );
});
