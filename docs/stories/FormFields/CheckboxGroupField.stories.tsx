import React from "react";
import { storiesOf } from "@storybook/react";

import { mockData } from "../Table/MOCK_DATA";
import { CheckboxGroup, IOption, ISelectProps, Select } from "../../../src/fields";
import { Panel } from "../../../src/Panel";
import { CheckboxGroupTest } from "./stateHelpers/CheckboxGroupTest";

const values: IOption[] = mockData.slice(0, 31).map((el) => ({
    value: el.id,
    label: el.first_name + " " + el.last_name,
}));

storiesOf("Form/Fields/CheckboxGroup", module)
    .add("Base", () => {
        return (
            <Panel>
                <CheckboxGroupTest options={values} value={[1, 3, 10]} />
            </Panel>
        );
    })
    .add("Columns", () => {
        return (
            <Panel>
                <h3>Columns 4 - horizontal direction</h3>
                <CheckboxGroupTest options={values} value={[1, 3, 10]} columns="horizontal" />
                <h3>Columns 3 - vertical direction</h3>
                <CheckboxGroupTest options={values} value={[1, 3, 10]} columns="vertical" columnsCount={3} />
                <h3>Columns 3 - horizontal direction</h3>
                <CheckboxGroupTest options={values} value={[1, 3, 10]} columns="horizontal" columnsCount={3} />
            </Panel>
        );
    })
    .add("Select and deselect all", () => {
        return (
            <Panel>
                <CheckboxGroupTest options={values} value={[1, 3, 10]} columns="vertical" selectTools={true} />
            </Panel>
        );
    })
    .add("Disabled edition", () => {
        return (
            <Panel>
                <CheckboxGroupTest options={values} value={[1, 3, 10]} editable={false} />
            </Panel>
        );
    });
