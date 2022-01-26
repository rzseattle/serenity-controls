import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { IGridFilter } from "../../../../interfaces/IGridFilter";
import GridRoot from "../../../../config/GridRoot";
import GridSwitchFilter, { IGridSwitchFilterConfig } from "./GridSwitchFilter";

export default {
    title: "DataGrid/Plugins/Filters/Selection/Switch",
    component: GridSwitchFilter,
    argTypes: {
        showCaption: {
            options: [true, false],
            control: { type: "radio" },
        },
        onFilterChange: { action: "filter changed" },
        onValueChange: { action: "value changed" },
    },
} as ComponentMeta<typeof GridSwitchFilter>;

const baseFilter: IGridFilter = {
    field: "lastName",
    caption: "Last name",
    filterType: "text",
    label: "Last name",
    isInAdvancedMode: false,
    value: [],
    config: {
        multiselect: true,
        values: [
            { value: "Female", label: "Female" },
            { value: "Male", label: "Male" },
            { value: "lcatterick1@so-net.ne.jp", label: "lcatterick1@so-net.ne.jp" },
            { value: "aschust2@i2i.jp", label: "aschust2@i2i.jp" },
            { value: "2016-12-23", label: "2016-12-23" },
            { value: "Adelind", label: "Adelind" },
            { value: "119.229.150.501", label: "119.229.150.501" },
        ],
        columns: 2,
    } as IGridSwitchFilterConfig,
};

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof GridSwitchFilter> = (args) => {

    return (
        <GridRoot>
            <GridSwitchFilter filter={baseFilter}  {...args} />
        </GridRoot>
    );
};

export const StorySimple = Template.bind({});
StorySimple.args = { filter: { ...baseFilter } };
StorySimple.storyName = "Simple";

export const StoryFocus = Template.bind({});
StoryFocus.args = { filter: { ...baseFilter }, autoFocus: true };
StoryFocus.storyName = "Auto focus";

export const StoryColumns = Template.bind({});
StoryColumns.args = { filter: { ...baseFilter, config: { ...baseFilter.config, columns: 3 } }, autoFocus: true };
StoryColumns.storyName = "Columns";

export const StoryMultipleChoice = Template.bind({});
StoryMultipleChoice.args = { filter: { ...baseFilter, config: { ...baseFilter.config, multiselect: 1 } } };
StoryMultipleChoice.storyName = "Multiselect";
