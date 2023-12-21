import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import GridFilterBody from "./GridFilterBody";
import { IGridFilter } from "../../../interfaces/IGridFilter";
import { GridRoot } from "../../../config/GridRoot";

export default {
    title: "DataGrid/Plugins/Filters/Common/Filter body",
    component: GridFilterBody,
    argTypes: {
        showCaption: {
            options: [true, false],
            control: { type: "radio" },
        },
        onFilterChange: { action: "filter changed" },
        onValueChange: { action: "value changed" },
    },
} as ComponentMeta<typeof GridFilterBody>;

const baseFilter: IGridFilter = {
    field: "lastName",
    caption: "Last name",
    filterType: "text",
    isInAdvancedMode: false,
    value: [],
};

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof GridFilterBody> = (args) => (
    <GridRoot>
        <GridFilterBody filter={baseFilter} {...args}>
            <div>Filter body</div>
        </GridFilterBody>
    </GridRoot>
);

export const Story1 = Template.bind({});
Story1.args = { filter: { ...baseFilter } };
Story1.storyName = "Simple";

export const StoryWithTitle = Template.bind({});
StoryWithTitle.args = { filter: { ...baseFilter, description: "test" }, showCaption: true };
StoryWithTitle.storyName = "Title";

export const StoryWithDescription = Template.bind({});
StoryWithDescription.args = { filter: { ...baseFilter, description: "test" }, showCaption: false };
StoryWithDescription.storyName = "Description";

export const StoryAdvancedModeSwitch = Template.bind({});
StoryAdvancedModeSwitch.args = { filter: { ...baseFilter }, showAdvancedSwitch: true, showCaption: true };
StoryAdvancedModeSwitch.storyName = "Advanced mode switch";

export const StoryFull = Template.bind({});
StoryFull.args = { filter: { ...baseFilter, description: "test" }, showAdvancedSwitch: true, showCaption: true };
StoryFull.storyName = "Full";
