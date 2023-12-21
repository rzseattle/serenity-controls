import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";
import { GridRoot } from "../../../config/GridRoot";
import GridFiltersPanel from "./GridFiltersPanel";
import { IGridFilter } from "../../../interfaces/IGridFilter";
import { IGridSwitchFilterConfig } from "../../../plugins/filters/SelectionFilters/GridSwitchFilter/GridSwitchFilter";
import { IGridSelectFilterConfig } from "../../../plugins/filters/SelectionFilters/GridSelectFilter/GridSelectFilter";

export default {
    title: "DataGrid/Parts/Addons/Grid filters panel",
    component: GridFiltersPanel,
    argTypes: {
        onFiltersChange: { action: "value changed" },
    },
} as ComponentMeta<typeof GridFiltersPanel>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof GridFiltersPanel> = (args) => {
    return (
        <GridRoot>
            <div style={{ width: 430, padding: 15, backgroundColor: "wheat" }}>
                <div style={{ width: 400, backgroundColor: "white", padding: 5 }}>
                    <GridFiltersPanel {...args} />
                </div>
            </div>
        </GridRoot>
    );
};

export const StoryEmpty = Template.bind({});
StoryEmpty.args = { filters: [] };
StoryEmpty.storyName = "No Filters";

export const StorySimple = Template.bind({});
StorySimple.args = { filters: [{ field: "test", filterType: "text" }] as IGridFilter[] };
StorySimple.storyName = "Simple";

export const StoryAdvanced = Template.bind({});
StoryAdvanced.args = { filters: [{ field: "test", filterType: "text", isInAdvancedMode: true }] as IGridFilter[] };
StoryAdvanced.storyName = "Advanced";

const filters: IGridFilter[] = [
    {
        field: "gender",
        caption: "Gender",
        filterType: "numeric",
        isInAdvancedMode: true,
        value: [
            {
                value: "1",
                condition: "LIKE",
                labelCondition: "contains",
                labelValue: null,
            },
            {
                value: "2",
                condition: "LIKE",
                labelCondition: "contains",
                labelValue: null,
            },
            {
                value: "3",
                condition: "LIKE",
                labelCondition: "contains",
                labelValue: null,
            },
        ],
    },
    {
        field: "gender",
        caption: "Gender",
        filterType: "switch",
        value: [],
        config: {
            values: [
                { value: "Female", label: "Female" },
                { value: "Male", label: "Male" },
            ],
        } as IGridSwitchFilterConfig,
    },

    {
        field: "smth",
        caption: "Gender multi",
        applyTo: "gender",
        filterType: "switch",
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
            columns: 3,
        } as IGridSwitchFilterConfig,
    },
    {
        field: "zzz",
        caption: "Gender select",
        applyTo: "gender",
        filterType: "select",
        value: [],
        config: {
            values: [
                { value: "Female", label: "Female" },
                { value: "Male", label: "Male" },
            ],
        } as IGridSelectFilterConfig,
    },
    {
        field: "gender",
        caption: "Gender",
        filterType: "date",
        value: [
            {
                value: "2022-01-22 / 2022-01-29",
                condition: "BETWEEN",
                labelCondition: "between",
                operator: "and",
                labelValue: null,
            },
            {
                value: "2022-01-22",
                condition: "=",
                labelCondition: "equals",
                labelValue: null,
            },
        ],
    },
];

export const StoryMultipleFilters = Template.bind({});
StoryMultipleFilters.args = {
    filters,
};
StoryMultipleFilters.storyName = "Multiple filters";
