import React from "react";
import { storiesOf } from "@storybook/react";

import { mockData } from "../Table/MOCK_DATA";
import { IOption, Select, Wysiwyg } from "../../src/fields";
import { Panel } from "../../src/Panel";
import { withKnobs, text } from "@storybook/addon-knobs";
const values: IOption[] = mockData.slice(0, 30).map((el) => ({
    value: el.id,
    label: el.first_name + " " + el.last_name,
}));

storiesOf("Wysiwig Field", module)
    .addDecorator(withKnobs)
    .add("Base", () => {
        return (
            <Panel>
                <Wysiwyg value={text("Label", "Hello Storybook")} onChange={(ev) => console.log(ev.value)} />
            </Panel>
        );
    });
