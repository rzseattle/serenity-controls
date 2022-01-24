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
        <GridAdvancedFilterContainer
            filter={baseFilter}
            fieldComponent={(value, onchange) => {
                return (
                    <input data-testid="input" value={value.value} onChange={(e) => onchange(e.target.value, null)} />
                );
            }}
            conditions={[
                { value: 1, label: "condition 1" },
                { value: 2, label: "condition 2" },
            ]}
            {...args}
        />
    </GridRoot>
);

export const StorySimple = Template.bind({});
StorySimple.args = { filter: { ...baseFilter, isInAdvancedMode: false } };
StorySimple.storyName = "Simple";

export const StoryWithTitle = Template.bind({});
StoryWithTitle.args = { filter: { ...baseFilter }, showCaption: true };
StoryWithTitle.storyName = "With title";

export const StoryAdvanced = Template.bind({});
StoryAdvanced.args = {
    filter: {
        ...baseFilter,
        isInAdvancedMode: true,
        value: [
            { value: "1", condition: "1" },
            { value: "2", condition: "2" },
        ],
    },
};
StoryAdvanced.storyName = "Advanced mode";
