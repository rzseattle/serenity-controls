import type { Meta, StoryObj } from "@storybook/react";
import { Shimmer } from "./Shimmer";

const meta: Meta<typeof Shimmer> = {
    title: "Loading/Shimmer",
    component: Shimmer,
    //👇 Enables auto-generated documentation for the component story
    tags: ["autodocs"],

    argTypes: {
        style: {},
    },
    parameters: {
        componentSubtitle: "Displays a shimmer effect",
    },
};

export default meta;
type Story = StoryObj<typeof Shimmer>;

export const Base: Story = {
    args: {
        style: { width: "200px", height: "200px" },
    },
};
