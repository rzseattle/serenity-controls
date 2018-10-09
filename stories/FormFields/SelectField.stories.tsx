import React from "react";
import { storiesOf } from "@storybook/react";

import { mockData } from "../Table/MOCK_DATA";
import { IOption, Select } from "../../src/fields";
import { Panel } from "../../src/Panel";

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
