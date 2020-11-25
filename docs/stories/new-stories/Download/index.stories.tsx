import React from "react";
import { storiesOf } from "@storybook/react";

import { IPanelProps, Panel } from "../../../../src/Panel";
import { download, DownloadButton, downloadString } from "../../../../src/Downloader";
import { Meta, Story } from "@storybook/react/types-6-0";

export default {
    title: "Controls/Download",
    component: DownloadButton,
    argTypes: {},
} as Meta;

const Template: Story<IPanelProps> = (args) => {
    return (
        <div style={{ padding: 10 }}>
            <a
                onClick={() =>
                    download("https://as-pl.com/resources/img/logo_common.png").then((result) =>
                        alert("Downloaded file: " + result.fileName),
                    )
                }
            >
                Download
            </a>
        </div>
    );
};

export const Template1 = Template.bind({});
Template1.storyName = "Helper";
Template1.args = {};

const Template2: Story<IPanelProps> = (args) => {
    return (
        <div style={{ padding: 10 }}>
            <h4>Icon</h4>

            <DownloadButton
                url={"https://as-pl.com/resources/img/logo_common.png"}
                onFinish={(result) => alert("Downloaded file: " + result.fileName)}
                mode="icon"
            />

            <h4>Link</h4>

            <DownloadButton
                url={"https://as-pl.com/resources/img/logo_common.png"}
                onFinish={(result) => alert("Downloaded file: " + result.fileName)}
            />

            <h4>Button</h4>

            <DownloadButton
                url={"https://as-pl.com/resources/img/logo_common.png"}
                onFinish={(result) => alert("Downloaded file: " + result.fileName)}
                mode="button"
            />
        </div>
    );
};

export const Template3 = Template2.bind({});
Template3.storyName = "Button";
Template3.args = {};
