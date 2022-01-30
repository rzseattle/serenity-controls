import React, { useEffect, useRef, useState } from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";
import GridRoot from "../../../config/GridRoot";
import { IGridFilter } from "../../../interfaces/IGridFilter";
import GridFiltersModal, { IGridFiltersModalProps } from "./GridFiltersModal";
import { IGridSwitchFilterConfig } from "../../../plugins/filters/SelectionFilters/GridSwitchFilter/GridSwitchFilter";

export default {
    title: "DataGrid/Parts/Addons/Grid filters modal",
    component: GridFiltersModal,
    argTypes: {},
} as ComponentMeta<typeof GridFiltersModal>;

const Example = (args: IGridFiltersModalProps) => {
    const relativeTo = useRef();

    const [isVisible, setVisible] = useState(false);
    useEffect(() => {
        setVisible(true);
    }, []);
    return (
        <>
            <div
                ref={relativeTo}
                style={{ border: "solid 1px grey", backgroundColor: "lightgray", width: 500, padding: 10 }}
                data-testid="relativeTo"
            >
                relative to
            </div>
            {isVisible && <GridFiltersModal {...args} relativeTo={relativeTo.current} />}
        </>
    );
};

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof GridFiltersModal> = (args) => {
    return (
        <GridRoot>
            <Example {...args} />
        </GridRoot>
    );
};

const filters: IGridFilter[] = [
    {
        field: "age",
        caption: "Age",
        filterType: "numeric",
        label: "Gender",
        isInAdvancedMode: false,
        value: [
            {
                value: "11",
                condition: "=",
                labelCondition: "contains",
                labelValue: null,
            },
            {
                value: "22",
                condition: "=",
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
        label: "Gender",
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
        label: "Gender multi",
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
];

export const StoryBasic = Template.bind({});
StoryBasic.args = {
    editedFilter: filters,
    filters: filters,
};
StoryBasic.storyName = "Basic";
