import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import { Placeholder, IPlaceholderProps } from "../../../../src/Placeholder";
import { Comm } from "../../../../src/lib";

export default {
    title: "Basic/Placeholder",
    component: Placeholder,
    argTypes: {
        promise: Comm._get("https://jsonplaceholder.typicode.com/users"),
    },
} as Meta;

const Template: Story<IPlaceholderProps> = (args) => {
    args.promise = new Promise((resolve) => {
        Comm._get("https://jsonplaceholder.typicode.com/users").then((result) =>
            setTimeout(() => {
                resolve(result);
            }, 1500),
        );
    });
    return (
        <div style={{ height: 200, width: 400 }}>
            <Placeholder {...args}>
                {(result) => {
                    if (result == null) {
                        return (
                            <div style={{ padding: 10 }}>
                                <h3>This container loading data now</h3>
                            </div>
                        );
                    }
                    return (
                        <ul>
                            {result.map((el: any) => (
                                <li key={el.id}>
                                    {el.name}, email
                                    {el.email}{" "}
                                </li>
                            ))}
                        </ul>
                    );
                }}
            </Placeholder>
        </div>
    );
};

export const Basic = Template.bind({});

Basic.args = {};

export const LoadingIndicatorTemplate = Template.bind({});
LoadingIndicatorTemplate.storyName = "With loading indicator";
LoadingIndicatorTemplate.args = {
    loadingIndicator: true,
    indicatorText: "Loading ...",
};

export const FromPromise = Template.bind({});
FromPromise.storyName = "Prerender";
FromPromise.args = {
    prerender: true,
};

export const PrerenderWithIndicator = Template.bind({});
PrerenderWithIndicator.storyName = "Prerender width indicator";
PrerenderWithIndicator.args = {
    prerender: true,
    loadingIndicator: true,
};

export const PrerenderWithOnlyShadow = Template.bind({});
PrerenderWithOnlyShadow.args = {
    prerender: true,
    shadow: true,
};
