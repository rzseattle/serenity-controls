import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { IGridFilter } from "../../../../interfaces/IGridFilter";
import GridRoot from "../../../../config/GridRoot";
import GridSelectFilter from "./GridSelectFilter";

export default {
    title: "DataGrid/Plugins/Filters/Selection/Select",
    component: GridSelectFilter,
    argTypes: {
        showCaption: {
            options: [true, false],
            control: { type: "radio" },
        },
        onFilterChange: { action: "filter changed" },
        onValueChange: { action: "value changed" },
    },
} as ComponentMeta<typeof GridSelectFilter>;

const baseFilter: IGridFilter = {
    field: "lastName",
    caption: "Last name",
    filterType: "text",
    label: "Last name",
    isInAdvancedMode: false,
    value: [],
    config: {
        values: [
            { value: "Female", label: "Female" },
            { value: "Male", label: "Male" },
            { value: "lcatterick1@so-net.ne.jp", label: "lcatterick1@so-net.ne.jp" },
            { value: "aschust2@i2i.jp", label: "aschust2@i2i.jp" },
            { value: "2016-12-23", label: "2016-12-23" },
            { value: "Adelind", label: "Adelind" },
            { value: "119.229.150.501", label: "119.229.150.501" },
        ],
    },
};

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof GridSelectFilter> = (args) => {
    return (
        <GridRoot>
            <GridSelectFilter filter={baseFilter} {...args} />
        </GridRoot>
    );
};

export const StorySimple = Template.bind({});
StorySimple.args = { filter: { ...baseFilter } };
StorySimple.storyName = "Simple";

export const StoryFocus = Template.bind({});
StoryFocus.args = { filter: { ...baseFilter }, autoFocus: true };
StoryFocus.storyName = "Auto focus";

export const StorySelected = Template.bind({});
StorySelected.args = {
    filter: {
        ...baseFilter,
        value: [{ value: "Adelind", condition: "=" }],
        config: { ...baseFilter.config },
    },
};
StorySelected.storyName = "Selected";
