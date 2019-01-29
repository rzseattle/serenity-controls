import React from "react";
import { storiesOf } from "@storybook/react";

import { CommandMenu } from "../../../src/CommandMenu";
import "./CommandMenu.stories.sass";

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
        icon: "Add",
        onClick: (event: React.MouseEvent, context: any) => {
            alert("clicked: " + context);
        },
    },
    {
        key: "f3",
        label: "Another option",
        icon: "Airplane",
        onClick: (event: React.MouseEvent, context: any) => {
            alert("clicked " + context);
        },
    },
];

storiesOf("CommandMenu", module)
    .add("Base", () => {
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
    })
    .add("Context", () => {
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
    });
