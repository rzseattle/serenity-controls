import React from "react";
import "./Stories.sass";
export const parameters = {
    actions: { argTypesRegex: "^on[A-Z].*" },
    options: {
        storySort: {
            order: ["Serenity", "Backoffice Panel", "Basic", "Overlays", "Table"],
        },
    },
};

export const decorators = [
    (Story) => (
        <div style={{  }} >
            <Story />
            <div id="modal-root"></div>
        </div>
    ),
];
