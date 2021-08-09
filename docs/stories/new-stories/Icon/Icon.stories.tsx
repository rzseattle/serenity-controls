import React from "react";

import { Meta, Story } from "@storybook/react/types-6-0";



export default {
    title: "Basic/Icon",

    argTypes: {
        name: {
            name: "name",
            type: { name: "string", required: false },
            defaultValue: "Add",
            control: {
                type: "text",
            },
        },
    },
} as Meta;

const Template: Story<any> = (args) => {
    return (
        <>
            <a
                href="https://material-ui.com/components/material-icons/"
                className={"btn btn-default"}
                target={"_blank"}
            >
                Browse
            </a>
            <hr />
            xxx
        </>
    );
};
