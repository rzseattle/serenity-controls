import type { Meta, StoryObj } from "@storybook/react";
import { ShimmerList } from "./ShimmerList";

const meta: Meta<typeof ShimmerList> = {
    title: "Loading/ShimmerList",
    component: ShimmerList,
    //👇 Enables auto-generated documentation for the component story
    tags: ["autodocs"],

    argTypes: {
        items: { control: { type: "number" } },
        columns: { control: { type: "number" } },
        shimmerProps: {},
    },
    parameters: {
        componentSubtitle: "Displays a shimmer effect for lists",
    },
};

export default meta;
type Story = StoryObj<typeof ShimmerList>;

export const Base: Story = {
    args: {
        items: 5,
    },
};

export const StyledExample: Story = {
    args: {
        items: 6,
        columns: 3,
        shimmerProps: {
            style: { height: 150 },
        },
    },
};
