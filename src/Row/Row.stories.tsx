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
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((el) => (
                <>
                    <div style={{ backgroundColor: "lightgray", height: 20 }}>
                        <Row cols={[el]}>
                            <div
                                key={el}
                                style={{
                                    backgroundColor: "grey",
                                    height: 20,
                                    textAlign: "center",
                                    color: "white",
                                    lineHeight: "20px",
                                }}
                            >
                                {el}
                            </div>
                        </Row>
                    </div>
                    <br />
                </>
            ))}
        </div>
    );
};

export const StoryBasic = Template.bind({});
StoryBasic.args = {};
StoryBasic.storyName = "Grid";

//👇 We create a “template” of how args map to rendering
const Template2: ComponentStory<typeof Row> = (args) => {
    return (
        <div>
            <>
                <div style={{ backgroundColor: "lightgray", minHeight: 20 }}>
                    <Row {...args}>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((el) => (
                            <div key={el} style={{ backgroundColor: "grey", height: 20 }}></div>
                        ))}
                    </Row>
                </div>
                <br />
                <Row {...args}>
                    {[1, 2, 3, 4, 5, 6].map((el) => (
                        <div key={el} style={{ backgroundColor: "grey", height: 20 }}></div>
                    ))}
                </Row>
                <br />
                <Row cols={[5, 1, 2, 3, 1]} {...args}>
                    {[1, 2, 3, 4, 5, 6].map((el) => (
                        <div key={el} style={{ backgroundColor: "grey", height: 20 }}></div>
                    ))}
                </Row>
                <br />
            </>
        </div>
    );
};

export const StoryBasic2 = Template2.bind({});
StoryBasic2.args = { noGutters: true };
StoryBasic2.storyName = "Grid 2";
