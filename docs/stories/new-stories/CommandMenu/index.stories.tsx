import React from "react";

import { CommandMenu } from "../../../../src/CommandMenu";
import "./CommandMenu.stories.sass";
import { Meta, Story } from "@storybook/react/types-6-0";
import { IPanelProps } from "../../../../src/Panel";
import { CommonIcons } from "../../../../src/lib/CommonIcons";

const containerStyle = {
    padding: 10,
};

const items = [
    {
        key: "f1",
        label: "Option 1",
        icon: "Add",
        onClick: (event: React.MouseEvent, context: any) => {
            alert("clicked: " + context);
        },
    },
    {
        key: "f2",
        label: "Option 2",
        icon: CommonIcons.add,
        onClick: (event: React.MouseEvent, context: any) => {
            alert("clicked: " + context);
        },
    },
    {
        key: "f3",
        label: "Another option",
        icon: CommonIcons.add,
        onClick: (event: React.MouseEvent, context: any) => {
            alert("clicked " + context);
        },
    },
];

export default {
    title: "Basic/Command menu",
    component: CommandMenu,
    argTypes: {},
} as Meta;

const Template: Story<IPanelProps> = (args) => {
    return (
        <div style={{ padding: 10 }}>
            <CommandMenu items={items}>
                {(opened: boolean) => <a className={"btn btn-primary " + (opened && "hover")}>Click to menu</a>}
            </CommandMenu>
            <hr />
            <CommandMenu items={items} activation={"hover"}>
                {(opened: boolean) => <a className={"btn btn-primary " + (opened && "hover")}>Hover to menu</a>}
            </CommandMenu>
        </div>
    );
};

export const Template1 = Template.bind({});
Template1.storyName = "Basic";
Template1.args = {};

const Template2: Story<IPanelProps> = (args) => {
    const list = ["Leanne Graham", "Ervin Howell", "Clementine Bauch"];
    return (
        <div style={containerStyle}>
            {list.map((el) => (
                <>
                    <hr />
                    <CommandMenu items={items} key={el} context={el}>
                        {(opened) => (
                            <a className={"btn btn-primary " + (opened && "hover")} style={{ width: 200 }}>
                                Item: {el}
                            </a>
                        )}
                    </CommandMenu>
                </>
            ))}
        </div>
    );
};

export const Template3 = Template2.bind({});
Template3.storyName = "Context";
Template3.args = {};
