import React, { useEffect, useRef, useState } from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import ConfirmDialogComp, { confirmDialog, IConfirmDialogCompProps } from "./ConfirmDialog";

export default {
    title: "Modal/Dialogs/ConfirmDialog",
    component: ConfirmDialogComp,
    argTypes: {
        onSelect: { action: "selected" },
        onAbort: { action: "abort" },
    },
} as ComponentMeta<typeof ConfirmDialogComp>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof ConfirmDialogComp> = (args) => {
    return <ConfirmDialogComp {...args} />;
};

export const StorySimple = Template.bind({});
StorySimple.args = {
    title: "This is test title",
    question: "Are U sure that U want to do that?",
    options: [
        { value: true, label: "yes" },
        { value: false, label: "no" },
    ],
    // onSelect: (val: any) => {
    //     //alert(val);
    // },
};
StorySimple.storyName = "Simple";

const ExampleRelative = (args: IConfirmDialogCompProps) => {
    const ref = useRef<HTMLDivElement>();
    const [isVisible, setVisible] = useState(false);
    useEffect(() => {
        setVisible(true);
    }, []);
    return (
        <div>
            <div ref={ref} style={{ margin: "50px 100px", border: "solid 1px grey", width: 100, textAlign: "center" }}>
                Some div
            </div>
            {isVisible && <ConfirmDialogComp relativeTo={ref.current} {...args} />}
        </div>
    );
};

//👇 We create a “template” of how args map to rendering
const Template2: ComponentStory<typeof ConfirmDialogComp> = (args) => {
    return <ExampleRelative {...args} />;
};

export const StoryRelative = Template2.bind({});
StoryRelative.args = {
    title: "This is test title",
    question: "Are U sure that U want to do that?",
    options: [
        { value: true, label: "yes" },
        { value: false, label: "no" },
    ],
    // onSelect: (val: any) => {
    //     //alert(val);
    // },
};
StoryRelative.storyName = "Relative";

const ExamplePromise = () => {
    return (
        <div>
            <div
                onClick={async (e) => {
                    const result = await confirmDialog("Do U really want to delete it?", {
                        relativeTo: e.currentTarget,
                    });
                    alert(result);
                }}
                style={{ margin: "50px 100px", border: "solid 1px grey", width: 100, textAlign: "center" }}
            >
                Some div
            </div>
        </div>
    );
};

//👇 We create a “template” of how args map to rendering
const Template3: ComponentStory<typeof ConfirmDialogComp> = () => {
    return <ExamplePromise />;
};

export const StoryPromise = Template3.bind({});
StoryRelative.args = {
    title: "This is test title",
    question: "Are U sure that U want to do that?",
    options: [
        { value: true, label: "yes" },
        { value: false, label: "no" },
    ],
    // onSelect: (val: any) => {
    //     //alert(val);
    // },
};
StoryRelative.storyName = "Relative";
