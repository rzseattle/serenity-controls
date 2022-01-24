import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";
import { IGridFilter } from "../../../../interfaces/IGridFilter";
import GridRoot from "../../../../config/GridRoot";
import GridDateFilter from "./GridDateFilter";

export default {
    title: "DataGrid/Plugins/Filters/Input Advanced/Date",
    component: GridDateFilter,
    argTypes: {
        showCaption: {
            options: [true, false],
            control: { type: "radio" },
        },
        onFilterChange: { action: "filter changed" },
        onValueChange: { action: "value changed" },
    },
} as ComponentMeta<typeof GridDateFilter>;

const baseFilter: IGridFilter = {
    field: "date",
    caption: "Date",
    filterType: "date",
    label: "Date",
    isInAdvancedMode: false,
    value: [],
};

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof GridDateFilter> = (args) => (
    <GridRoot>
        <GridDateFilter filter={baseFilter} {...args} />
    </GridRoot>
);

export const Story1 = Template.bind({});
Story1.args = { filter: { ...baseFilter, isInAdvancedMode: false } };
Story1.storyName = "Simple";


export const StoryFocus = Template.bind({});
StoryFocus.args = { filter: { ...baseFilter }, autoFocus: true };
StoryFocus.storyName = "Auto focus";
