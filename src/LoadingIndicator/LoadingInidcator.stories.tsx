import type { Meta, StoryObj } from "@storybook/react";
import { LoadingIndicator } from "./LoadingIndicator";

const meta: Meta<typeof LoadingIndicator> = {
    title: "Loading/Indicator",
    component: LoadingIndicator,
    //👇 Enables auto-generated documentation for the component story
    tags: ["autodocs"],

    argTypes: {
        size: { control: { type: "number" } },
        text: { control: { type: "text" } },
    },
    parameters: {
        componentSubtitle: "Displays a shimmer effect",
    },
};

export default meta;
type Story = StoryObj<typeof LoadingIndicator>;

export const Base: Story = {
    args: {},
};
