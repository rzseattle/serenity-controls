import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { IGridFilter } from "../../../../interfaces/IGridFilter";
import GridRoot from "../../../../config/GridRoot";
import GridBooleanFilter from "./GridBooleanFilter";

export default {
    title: "DataGrid/Plugins/Filters/Selection/Boolean",
    component: GridBooleanFilter,
    argTypes: {
        showCaption: {
            options: [true, false],
            control: { type: "radio" },
        },
        onFilterChange: { action: "filter changed" },
        onValueChange: { action: "value changed" },
    },
} as ComponentMeta<typeof GridBooleanFilter>;

const baseFilter: IGridFilter = {
    field: "lastName",
    caption: "Last name",
    filterType: "text",
    isInAdvancedMode: false,
    value: [],
};

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof GridBooleanFilter> = (args) => (
    <GridRoot>
        <GridBooleanFilter filter={baseFilter} {...args} />
    </GridRoot>
);

export const Story1 = Template.bind({});
Story1.args = { filter: { ...baseFilter } };
Story1.storyName = "Simple";

export const StorySelected = Template.bind({});
StorySelected.args = { filter: { ...baseFilter, value: [{ value: true, condition: "=" }] }, autoFocus: true };
StorySelected.storyName = "Selected";

export const StoryFocus = Template.bind({});
StoryFocus.args = { filter: { ...baseFilter }, autoFocus: true };
StoryFocus.storyName = "Auto focus";
