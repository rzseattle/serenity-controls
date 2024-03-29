import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";
import GridHead from "./GridHead";
import { GridRoot } from "../../../config/GridRoot";
import { IGridColumn } from "../../../interfaces/IGridColumn";
import { getColumnsWidths } from "../../../helpers/helpers";

export default {
    title: "DataGrid/Parts/GridHead",
    component: GridHead,
    argTypes: {
        onOrderChange: { action: "filter changed" },
        onFiltersChange: { action: "value changed" },
    },
} as ComponentMeta<typeof GridHead>;

const columns: IGridColumn<any>[] = [{ field: "xxx" }, { field: "yyy" }, { field: "ccc" }, { field: "www" }];

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof GridHead> = (args) => {
    return (
        <GridRoot>
            <div style={{ display: "grid", gridTemplateColumns: getColumnsWidths(columns) }}>
                <GridHead columns={columns} order={[]} filters={[]} {...args} />
            </div>
        </GridRoot>
    );
};

export const StorySimple = Template.bind({ columns });
StorySimple.args = {};
StorySimple.storyName = "Simple";
