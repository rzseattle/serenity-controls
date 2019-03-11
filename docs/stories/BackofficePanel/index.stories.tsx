import React from "react";
import { storiesOf } from "@storybook/react";

// @ts-ignore
import { withKnobs, radios } from "@storybook/addon-knobs";
import { Panel } from "../../../src/Panel";
import { TabPane, Tabs } from "../../../src/Tabs";
import { Placeholder } from "../../../src/Placeholder";
import { BackOfficePanel } from "../../../src/backoffice";

storiesOf("BackofficePanel", module).add("Base", () => (
    <>
        <BackOfficePanel
            user={{ login: "test" }}
            icon="AirplaneSolid"
            menu={[
                {
                    icon: "Page",
                    title: "CMS ",
                    active: true,
                    opened: true,
                    elements: [
                        { icon: "Page", title: "Pages", route: "/pages" },
                        { icon: "Page", title: "Posts", route: "/pages" },
                        { icon: "Page", title: "Events", route: "/pages" },
                    ],
                },
            ]}
        />
    </>
));
