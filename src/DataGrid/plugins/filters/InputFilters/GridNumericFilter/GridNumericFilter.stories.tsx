import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";
import GridNumericFilter from "./GridNumericFilter";
import { IGridFilter } from "../../../../interfaces/IGridFilter";
import { GridRoot } from "../../../../config/GridRoot";

export default {
    title: "DataGrid/Plugins/Filters/Input Advanced/Numeric",
    component: GridNumericFilter,
    argTypes: {
        showCaption: {
            options: [true, false],
            control: { type: "radio" },
        },
        onFilterChange: { action: "filter changed" },
        onValueChange: { action: "value changed" },
    },
} as ComponentMeta<typeof GridNumericFilter>;

const baseFilter: IGridFilter = {
    field: "age",
    caption: "Age",
    filterType: "numeric",
    isInAdvancedMode: false,
    value: [],
};

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof GridNumericFilter> = (args) => (
    <GridRoot>
        <GridNumericFilter filter={baseFilter} {...args} />
    </GridRoot>
);

export const Story1 = Template.bind({});
Story1.args = { filter: { ...baseFilter, isInAdvancedMode: false } };
Story1.storyName = "Simple";

export const StoryFocus = Template.bind({});
StoryFocus.args = { filter: { ...baseFilter }, autoFocus: true };
StoryFocus.storyName = "Auto focus";
