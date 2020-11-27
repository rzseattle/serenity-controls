import React from "react";

import { Story, Meta } from "@storybook/react/types-6-0";

import { IPanelProps, Panel } from "../../../../src/Panel";

const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vestibulum molestie nibh eget aliquet. Morbi a magna molestie, laoreet mi vitae, suscipit mi. Sed pulvinar massa eros, faucibus volutpat tellus placerat ut. Proin dictum mauris quis risus pretium varius. Donec porttitor ultricies urna eu elementum.
        Sed ullamcorper sapien mi, sed dignissim magna fermentum fringilla. Suspendisse consequat mauris tristique metus ullamcorper, sed ultricies magna tincidunt. Aenean sit amet enim vitae nisi
        placerat convallis vel id velit. Mauris placerat lacus ex, vel tincidunt mauris aliquet ut. Etiam molestie imperdiet est at hendrerit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed vitae orci euismod, rhoncus libero nec, sollicitudin orci.

        Aliquam tincidunt enim nec diam sagittis aliquam. Phasellus ultricies nunc at iaculis tincidunt. Morbi dui nisl, interdum quis porttitor tincidunt, interdum vel quam. Pellentesque ac ipsum tristique, ornare tellus nec, lacinia est. Pellentesque viverra, diam at aliquam vestibulum, nisi risus blandit sem, vel
        porttitor odio augue eu risus. Nunc sollicitudin vitae libero a dapibus. Etiam nec imperdiet lectus. Vestibulum facilisis augue at viverra auctor. Proin maximus tortor vitae sem pretium feugiat.
        Morbi posuere orci et felis placerat, et eleifend purus ultricies.`;

export default {
    title: "Basic/Panel",
    component: Panel,
    argTypes: {},
} as Meta;

const Template: Story<IPanelProps> = (args) => {
    return <div style={{padding: 10, backgroundColor: "lightgrey"}}><Panel {...args}>{text}</Panel></div>;
};

export const Template1 = Template.bind({});
Template1.storyName = "Basic";
Template1.args = {};

export const Template2 = Template.bind({});
Template2.storyName = "No padding";
Template2.args = {
    noPadding: true,
};

export const Template3 = Template.bind({});
Template3.storyName = "Title";
Template3.args = {
    title: "This is panel title",
};

export const Template4 = Template.bind({});
Template4.storyName = "With CommandBar";
Template4.args = {
    title: "This is panel title",
    toolbar: [
        { key: "f1", label: "Add", icon: "Add", onClick: () => alert("Add action") },
        { key: "f2", label: "Delete", icon: "Delete", onClick: () => alert("Delete action") },
    ],
};
