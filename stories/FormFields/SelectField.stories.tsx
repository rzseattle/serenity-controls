import React from "react";
import { storiesOf } from "@storybook/react";

import { IOption } from "../../src/ctrl/fields/Interfaces";
import { Select } from "../../src/ctrl/fields/Select";

import { mockData } from "../Table/MOCK_DATA";
import { Panel } from "../../src/ctrl/common";

const values: IOption[] = mockData.slice(0, 30).map((el) => ({
    value: el.id,
    label: el.first_name + " " + el.last_name,
}));

storiesOf("Select Field", module).add("Base", () => {
    return (
        <Panel>
            <Select options={values} value={1} />
        </Panel>
    );
});
