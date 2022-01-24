import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";
import GridAdvancedFilterContainer from "./GridAdvancedFilterContainer";
import { IGridFilter } from "../../../../interfaces/IGridFilter";
import GridRoot from "../../../../config/GridRoot";

export default {
    title: "DataGrid/Plugins/Filters/Input Advanced/Container",
    component: GridAdvancedFilterContainer,
    argTypes: {
        showCaption: {
            options: [true, false],
            control: { type: "radio" },
        },
        onFilterChange: { action: "filter changed" },
        onValueChange: { action: "value changed" },
    },
} as ComponentMeta<typeof GridAdvancedFilterContainer>;

const baseFilter: IGridFilter = {
    field: "lastName",
    caption: "Last name",
    filterType: "text",
    label: "Last name",
    isInAdvancedMode: false,
    value: [],
};

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof GridAdvancedFilterContainer> = (args) => (
    <GridRoot>
        <GridAdvancedFilterContainer filter={baseFilter} {...args} />
    </GridRoot>
);

export const Story1 = Template.bind({});
Story1.args = { filter: { ...baseFilter, isInAdvancedMode: false } };
Story1.storyName = "Simple";


export const StoryFocus = Template.bind({});
StoryFocus.args = { filter: { ...baseFilter }, autoFocus: true };
StoryFocus.storyName = "Auto focus";
