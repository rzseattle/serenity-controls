import React from "react";
import { storiesOf } from "@storybook/react";

// @ts-ignore
import { withKnobs, radios } from "@storybook/addon-knobs";
import { Panel } from "../../../src/Panel";
import { TabPane, Tabs } from "../../../src/Tabs";
import { Placeholder } from "../../../src/Placeholder";
import { Navbar } from "../../../src/Navbar";
import { download, DownloadButton } from "../../../src/Downloader";

storiesOf("Download", module)
    .add("Helper", () => (
        <Panel>
            <a
                onClick={() =>
                    download("https://as-pl.com/resources/img/logo_common.png").then((result) => alert("Downloaded file: " + result.fileName))
                }
            >
                Download
            </a>
        </Panel>
    ))
    .add("Button", () => (
        <Panel>
            <DownloadButton
                url={"https://as-pl.com/resources/img/logo_common.png"}
                onFinish={(result) => alert("Downloaded file: " + result.fileName)}
            />
        </Panel>
    ));
