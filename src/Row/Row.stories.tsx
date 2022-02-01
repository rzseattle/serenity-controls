import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Row } from "./Row";

export default {
    title: "Layout/Row",
    component: Row,
    argTypes: {},
} as ComponentMeta<typeof Row>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof Row> = (args) => {
    return (
        <div>
            <Row>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((el) => (
                    <div key={el} style={{ backgroundColor: "red", border: "solid 1px grey", height: 20 }}></div>
                ))}
            </Row>
            <br />
            <br />
            <Row>
                <div style={{ backgroundColor: "red", border: "solid 1px grey", height: 20 }}></div>
                <div style={{ backgroundColor: "red", border: "solid 1px grey", height: 20 }}></div>
                <div style={{ backgroundColor: "red", border: "solid 1px grey", height: 20 }}></div>
                <div style={{ backgroundColor: "red", border: "solid 1px grey", height: 20 }}></div>
                <div style={{ backgroundColor: "red", border: "solid 1px grey", height: 20 }}></div>
                <div style={{ backgroundColor: "red", border: "solid 1px grey", height: 20 }}></div>
                <div style={{ backgroundColor: "red", border: "solid 1px grey", height: 20 }}></div>
            </Row>
        </div>
    );
};

export const StoryBasic = Template.bind({});
StoryBasic.args = {};
StoryBasic.storyName = "Basic";
