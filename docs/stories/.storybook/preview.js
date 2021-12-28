import React from "react";
import "../Stories.sass";
import GridRoot from "../../../src/DataGrid/config/GridRoot";
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
        <div style={{ margin: "2em" }}>
            <GridRoot>
                <Story />
            </GridRoot>
            <div id="modal-root"></div>
        </div>
    ),
];
