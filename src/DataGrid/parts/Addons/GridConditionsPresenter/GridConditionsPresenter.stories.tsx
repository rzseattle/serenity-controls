import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";
import GridRoot from "../../../config/GridRoot";
import { IGridFilter } from "../../../interfaces/IGridFilter";
import { IGridSwitchFilterConfig } from "../../../plugins/filters/SelectionFilters/GridSwitchFilter/GridSwitchFilter";
import GridConditionsPresenter from "./GridConditionsPresenter";
import { IGridOrder } from "../../../interfaces/IGridOrder";

export default {
    title: "DataGrid/Parts/Addons/Grid conditions presenter",
    component: GridConditionsPresenter,
    argTypes: {},
} as ComponentMeta<typeof GridConditionsPresenter>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof GridConditionsPresenter> = (args) => {
    return (
        <GridRoot>
            <GridConditionsPresenter {...args} />
        </GridRoot>
    );
};

const filters: IGridFilter[] = [
    {
        field: "age",
        caption: "Age caption",
        filterType: "numeric",
        isInAdvancedMode: false,
        value: [
            {
                value: "11",
                condition: "=",
                labelCondition: "is equal",
                labelValue: null,
            },
            {
                value: "22",
                condition: "LIKE",
                labelCondition: "contains",
                labelValue: "twenty two",
                operator: "or",
            },
            {
                value: "3",

                condition: "LIKE",
                labelCondition: "contains",
                labelValue: null,
                operator: "or",
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
        field: "some_multi_field",
        applyTo: "gender",
        filterType: "switch",
        value: [
            {
                value: "Female",
                condition: "LIKE",
                labelCondition: "=",
                labelValue: null,
            },
        ],
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
];

const order: IGridOrder[] = [
    { field: "sort_field", caption: "Sort field", dir: "asc" },
    { field: "other_sort_field", caption: null, dir: "desc" },
];

export const StoryBasic = Template.bind({});
StoryBasic.args = {
    editedFilter: filters,
    filters: filters,
    order: order,
};
StoryBasic.storyName = "Basic";
