import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";
import GridRoot from "../../../config/GridRoot";
import { IMockUser, mockData } from "../../../__mocks__/MockUsers";
import GridRow, { IRowProps } from "./GridRow";
import { getColumnsWidths } from "../../../helpers/helpers";

import styles from "./GridRow.stories.module.sass";
import { IGridColumn } from "../../../interfaces/IGridColumn";

export default {
    title: "DataGrid/Parts/GridBody/Grid row",
    component: GridRow,
    argTypes: {},
} as ComponentMeta<typeof GridRow>;

const columns: IGridColumn<IMockUser>[] = [{ field: "id" }, { field: "last_name" }, { field: "email" }];

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof GridRow> = (args) => {
    return (
        <GridRoot>
            <div
                style={{ display: "grid", gridTemplateColumns: getColumnsWidths(columns) }}
                className={styles.container}
            >
                <GridRow {...args} />
            </div>
        </GridRoot>
    );
};

export const StoryBasic = Template.bind({});
StoryBasic.args = {
    row: mockData.slice(0, 1)[0],
    columns,
};
StoryBasic.storyName = "Basic";

const args: IRowProps<IMockUser> = {
    row: mockData.slice(0, 1)[0],
    columns,
    cellClassTemplate: ({ column }) => {
        if (column.field === "id") return ["important"];
    },
    rowNumber: 0,
    rowProperties: {},
};

export const StoryCellCassTemplate = Template.bind({});
StoryCellCassTemplate.args = args;
StoryCellCassTemplate.storyName = "With class template";

export const StoryCellCassTemplateByColumn = Template.bind({});
StoryCellCassTemplateByColumn.args = {
    row: mockData.slice(0, 1)[0],
    columns: [
        {
            field: "id",
            cell: {
                classTemplate: ({ row }) => {
                    if (row.id == 1) {
                        return ["important"];
                    }
                },
            },
        },
        { field: "last_name" },
        { field: "email" },
    ] as IGridColumn<IMockUser>[],
    rowNumber: 0,
    rowProperties: {},
};
StoryCellCassTemplateByColumn.storyName = "With class template (by column)";

export const StoryCellStyleTemplate = Template.bind({});
StoryCellStyleTemplate.args = {
    row: mockData.slice(0, 1)[0],
    columns,
    cellStyleTemplate: ({ column }) => {
        if (column.field === "id") {
            return { backgroundColor: "red" };
        }
        return {};
    },
    rowNumber: 0,
    rowProperties: {},
} as IRowProps<IMockUser>;
StoryCellStyleTemplate.storyName = "With style template";

export const StoryCellStyleTemplateByColumn = Template.bind({});
StoryCellStyleTemplateByColumn.args = {
    row: mockData.slice(0, 1)[0],
    columns: [
        {
            field: "id",
            cell: {
                styleTemplate: ({ row }) => {
                    if (row.id == 1) {
                        return { backgroundColor: "red" };
                    }
                },
            },
        },
        { field: "last_name" },
        { field: "email" },
    ] as IGridColumn<IMockUser>[],
    rowNumber: 0,
    rowProperties: {},
};
StoryCellStyleTemplateByColumn.storyName = "With class template (by column)";

export const StoryCellTemplate = Template.bind({});
StoryCellTemplate.args = {
    row: mockData.slice(0, 1)[0],
    columns: [
        {
            field: "id",
            cell: {
                template: ({ row }) => {
                    return "x " + row.id + " x";
                },
            },
        },
        { field: "last_name" },
        { field: "email" },
    ] as IGridColumn<IMockUser>[],
    rowNumber: 0,
    rowProperties: {},
};
StoryCellTemplate.storyName = "Cell template";

const columns2: IGridColumn<IMockUser>[] = [
    { field: "id" },
    {
        field: "last_name",
        cell: {
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
                onDragStart: [
                    () => {
                        console.log("drag start");
                    },
                ],
                onDrag: [
                    () => {
                        console.log("drag");
                    },
                ],
                onDrop: [
                    () => {
                        console.log("drop");
                    },
                ],
                onDragOver: [
                    () => {
                        console.log("drag over");
                    },
                ],
                onDragEnter: [
                    () => {
                        console.log("drag enter");
                    },
                ],
                onDragLeave: [
                    () => {
                        console.log("drag leave");
                    },
                ],
            },
        },
    },
    { field: "email" },
];

const args3: IRowProps<IMockUser> = {
    row: mockData.slice(0, 1)[0],
    columns: columns2,
    rowNumber: 0,
    rowProperties: {},
};

export const StoryEvents = Template.bind({});
StoryEvents.args = args3;
StoryEvents.storyName = "Events";
