import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";
import { GridRoot } from "../../config/GridRoot";
import Pagination from "./Pagination";

export default {
    title: "DataGrid/Plugins/Pagination",
    component: Pagination,
    argTypes: {
        currentPage: {
            control: { type: "number" },
        },
        setCurrentPage: { action: "setCurrentPage" },
        setOnPage: { action: "setOnPage" },
    },
} as ComponentMeta<typeof Pagination>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof Pagination> = (args) => {
    return (
        <GridRoot>
            <Pagination {...args} />
        </GridRoot>
    );
};

export const StorySimple = Template.bind({});
StorySimple.args = { onPage: 25, currentPage: 2, all: 1000 };
StorySimple.storyName = "Simple";
