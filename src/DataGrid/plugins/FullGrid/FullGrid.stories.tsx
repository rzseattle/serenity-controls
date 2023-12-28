import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { GridRoot } from "../../config/GridRoot";
import { FullGrid } from "./FullGrid";
import { IMockUser, mockData } from "../../__mocks__/MockUsers";
import { ColumnTemplate } from "../columns/ColumnTemplate";
import { ColNumber } from "../columns/ColNumber";
import { ColDate } from "../columns/ColDate";
import { ColText } from "../columns/ColText";

export default {
    title: "DataGrid/Plugins/FullGrid",
    component: FullGrid,
    argTypes: {
        dataProvider: () => Promise.resolve({ rows: mockData, count: mockData.length }),
    },
} as ComponentMeta<typeof FullGrid>;

const dataProvider = () => Promise.resolve({ rows: mockData, count: mockData.length });

const columns: ColumnTemplate<IMockUser>[] = [
    ColNumber.create<IMockUser>("id", "ID").width("auto"),
    ColDate.create<IMockUser>("date", "Date").width("auto"),
    ColText.create("email", "Email"),
    ColText.create("ip_address", "IP"),
    ColText.create("first_name", "Firstname"),
    ColText.create("last_name", "Lastname"),
];

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof FullGrid> = (args) => {
    return (
        <GridRoot>
            <FullGrid {...args} columns={columns} dataProvider={dataProvider} />
        </GridRoot>
    );
};

export const StorySimple = Template.bind({});
StorySimple.args = {};
StorySimple.storyName = "Simple";
