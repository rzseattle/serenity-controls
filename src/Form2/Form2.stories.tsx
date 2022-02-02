import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";
import Form2 from "./Form2";

export default {
    title: "Form/Form 1",
    component: Form2,
    argTypes: {},
} as ComponentMeta<typeof Form2>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof Form2> = (args) => {
    return <Form2 {...args} />;
};

export const StoryBasic = Template.bind({});
StoryBasic.args = {};
StoryBasic.storyName = "Form";
