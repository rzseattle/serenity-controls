import React from "react";
import { action } from "@storybook/addon-actions";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import GridRoot from "../../../config/GridRoot";
import { IGridColumn } from "../../../interfaces/IGridColumn";
import GridHeadColumn from "./GridHeadColumn";

export default {
    title: "DataGrid/Parts/GridHeadColumn",
    component: GridHeadColumn,
    argTypes: {
        onOrderChange: { action: "order changed" },
        onFiltersChange: { action: "filter changed" },
    },
} as ComponentMeta<typeof GridHeadColumn>;

const column: IGridColumn<any> = { field: "field_name" };

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof GridHeadColumn> = (args) => {
    return (
        <GridRoot>
            <GridHeadColumn {...args} />
        </GridRoot>
    );
};

export const StorySimple = Template.bind({});
StorySimple.args = { column };
StorySimple.storyName = "Simple";

export const StorySortable = Template.bind({});
StorySortable.args = { column, isOrderable: true, orderDir: "asc" };
StorySortable.storyName = "Sortable";

export const StoryFilter = Template.bind({});
StoryFilter.args = { column, filters: [{ field: "field_name", value: [], filterType: "text", label: "" }] };
StoryFilter.storyName = "Filter";

export const StoryTemplate = Template.bind({});
StoryTemplate.args = {
    column: {
        ...column,
        header: {
            template: ({
                column,
                defaultClassName,
                triggerFiltersShow,
            }: {
                column: IGridColumn<any>;
                defaultClassName: string;
                triggerFiltersShow: () => any;
            }) => {
                return (
                    <div
                        onClick={() => {
                            triggerFiltersShow();
                        }}
                        className={defaultClassName}
                    >
                        {column.field + " " + "template text"}
                    </div>
                );
            },
        },
    },
    filters: [{ field: "field_name", value: [], filterType: "text", label: "" }],
};
StoryTemplate.storyName = "Template";

export const StoryEventOnClick = Template.bind({});
StoryEventOnClick.args = {
    column: {
        ...column,
        header: {
            events: {
                onClick: [
                    () => {
                        console.log("clicked");
                    },
                ],
                onMouseUp: [
                    () => {
                        console.log("mouse up");
                    },
                ],
                onMouseDown: [
                    () => {
                        console.log("mouse down");
                    },
                ],
                onDoubleClick: [
                    () => {
                        console.log("double clicked");
                    },
                ],
                onMouseEnter: [
                    () => {
                        console.log("mouse enter");
                    },
                ],
                onMouseOut: [
                    () => {
                        console.log("mouse out");
                    },
                ],
            },
        },
    },
};
StoryEventOnClick.storyName = "Events";
