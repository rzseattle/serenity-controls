import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";
import { GridRoot } from "../../../config/GridRoot";
import GridBody from "./GridBody";
import { IMockUser, mockData } from "../../../__mocks__/MockUsers";
import { getColumnsWidths } from "../../../helpers/helpers";
import { IGridColumn } from "../../../interfaces/IGridColumn";
import styles from "./GridBody.stories.module.sass";

export default {
    title: "DataGrid/Parts/GridBody/Grid body",
    component: GridBody,
    argTypes: {},
} as ComponentMeta<typeof GridBody>;

const columns: IGridColumn<IMockUser>[] = [{ field: "id" }, { field: "last_name" }, { field: "email" }];

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof GridBody> = (args) => {
    return (
        <GridRoot>
            <div
                style={{ display: "grid", gridTemplateColumns: getColumnsWidths(columns) }}
                className={styles.container}
            >
                <GridBody {...args} />
            </div>
        </GridRoot>
    );
};

export const StoryBasic = Template.bind({});
StoryBasic.args = {
    rows: mockData.slice(0, 20),
    columns,
};
StoryBasic.storyName = "Basic";

export const StoryClassTemplate = Template.bind({});
StoryClassTemplate.args = {
    rows: mockData.slice(0, 20),
    columns,
    rowClassTemplate: ({ row }: { row: IMockUser }) => {
        if (row["id"] === 5) {
            return ["red"];
        }
    },
};
StoryClassTemplate.storyName = "Class template";
