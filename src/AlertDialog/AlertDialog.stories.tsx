import type { Meta, StoryObj } from "@storybook/react";
import { alertDialog } from "./AlertDialog";
import React from "react";
import { IConfirmDialogCompProps } from "../ConfirmDialog";

const TestComponent = ({ message, options = {} }: { message: string; options: Partial<IConfirmDialogCompProps> }) => {
    return (
        <div style={{ height: 200 }}>
            All options like on ConfirmDialog
            <hr />
            <button
                onClick={() => {
                    alertDialog(message, options).then(() => {
                        console.log("clicked");
                    });
                }}
            >
                click
            </button>
        </div>
    );
};

const meta: Meta<typeof TestComponent> = {
    title: "Modal/Dialogs/AlertDialog",
    component: TestComponent,
    //👇 Enables auto-generated documentation for the component story
    tags: ["autodocs"],

    argTypes: {},
    parameters: {
        componentSubtitle: "Alert dialog use",
    },
};

export default meta;
type Story = StoryObj<typeof TestComponent>;

export const Base: Story = {
    args: {
        message: "This is message",
        options: {
            title: "This is title",
        },
    },
};
