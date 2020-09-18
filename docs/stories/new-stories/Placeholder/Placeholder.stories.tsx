import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";

import { IModalProps, Modal } from "../../../../src/Modal";
import { Placeholder, IPlaceholderProps } from "../../../../src/Placeholder";
import { Comm } from "../../../../src/lib";
import { PrintJSON } from "../../../../src/PrintJSON";


export default {
    title: "My/TesElement",
    component: Placeholder,
    argTypes: {
        promise: Comm._get("https://jsonplaceholder.typicode.com/users"),
    },
} as Meta;

const Template: Story<IPlaceholderProps> = (args) => {
    args.promise = new Promise((resolve) => {
        Comm._get("https://jsonplaceholder.typicode.com/users").then((result) => setTimeout(() => {
            resolve(result);
        }, 1500));
    });
    return (<Placeholder {...args} >{(result) => {
        if (result == null) {
            return <div style={{ padding: 100 }}>This container loading data now</div>;
        }
        return (<ul>
            {result.map((el: any) => (
                <li key={el.id}>
                    {el.name}, email
                    {el.email}{" "}
                </li>
            ))}</ul>);
    }
    }</Placeholder>);
};

export const Basic = Template.bind({});

Basic.args = {

};

export const FromPromise = Template.bind({});
FromPromise.storyName = "Prerender";

FromPromise.args = {
    prerender: true,
};

export const Large = Template.bind({});
Large.args = {
    indicatorText: "test"
};

export const Small = Template.bind({});
Small.args = {};
