import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";
import GridTextFilter from "../../../../../../src/DataGrid/plugins/filters/InputFilters/GridTextFilter";
import GridRoot from "../../../../../../src/DataGrid/config/GridRoot";
import { IGridFilter } from "../../../../../../src/DataGrid/interfaces/IGridFilter";

export default {
    title: "DataGrid/Plugins/Filters/Text",
    component: GridTextFilter,
    argTypes: {
        showCaption: {
            options: [true, false],
            control: { type: "radio" },
        },
        onFilterChange: { action: "filter changed" },
        onValueChange: { action: "value changed" }

    },
} as ComponentMeta<typeof GridTextFilter>;

const baseFilter: IGridFilter = {
    field: "lastName",
    caption: "Last name",
    filterType: "text",
    label: "Last name",
    isInAdvancedMode: false,
    value: [],
};

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof GridTextFilter> = (args) => (
    <GridRoot>
        <GridTextFilter
            filter={baseFilter}
            {...args}
        />
    </GridRoot>
);

export const Story1 = Template.bind({});
Story1.args = {filter: baseFilter};
Story1.storyName = "Simple";

export const Story2 = Template.bind({});
Story2.args = {filter: {...baseFilter, isInAdvancedMode: true}};
Story2.storyName = "Advanced";
