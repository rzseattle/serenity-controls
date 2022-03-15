import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Breadcrumb, BreadcrumbItem } from "./Breadcrumb";
import { CommonIcons } from "../lib/CommonIcons";

export default {
    title: "Layout/Breadcrumb",
    component: Breadcrumb,
    argTypes: {},
} as ComponentMeta<typeof Breadcrumb>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof Breadcrumb> = (args) => {
    return (
        <Breadcrumb>
            <BreadcrumbItem>Home</BreadcrumbItem>
            <BreadcrumbItem icon={CommonIcons.folder}>
                <>Shop</>
            </BreadcrumbItem>
            <BreadcrumbItem>
                <a>Products</a>
            </BreadcrumbItem>
            <BreadcrumbItem>Bag 2001</BreadcrumbItem>
        </Breadcrumb>
    );
};

export const StoryBasic = Template.bind({});
StoryBasic.args = {};
StoryBasic.storyName = "Base";
