import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";
import GridRoot from "../../config/GridRoot";
import FullGrid from "./FullGrid";

export default {
    title: "DataGrid/Plugins/FullGrid",
    component: FullGrid,
    argTypes: {
        currentPage: {
            control: { type: "number" },
        },
        setCurrentPage: { action: "setCurrentPage" },
        setOnPage: { action: "setOnPage" },
    },
} as ComponentMeta<typeof FullGrid>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof FullGrid> = (args) => {
    return (
        <GridRoot>
            <FullGrid {...args} />
        </GridRoot>
    );
};

export const StorySimple = Template.bind({});
StorySimple.args = { onPage: 25, currentPage: 2, all: 1000 };
StorySimple.storyName = "Simple";
