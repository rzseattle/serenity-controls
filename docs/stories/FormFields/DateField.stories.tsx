import React from "react";
import { storiesOf } from "@storybook/react";

import { Panel } from "../../../src/Panel";
import { DateTest } from "./stateHelpers/DateTest";

storiesOf("Field: Date", module)
    .add("Base", () => {
        return (
            <Panel>
                <div style={{ height: 800 }}>
                    <DateTest value="2018-11-11" />
                </div>
            </Panel>
        );
    })
    .add("Placeholder", () => {
        return (
            <Panel>
                <div style={{ height: 800 }}>
                    <DateTest placeholder={"Fill date"} value={null} />
                </div>
            </Panel>
        );
    });
