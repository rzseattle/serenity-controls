import React from "react";
import { storiesOf } from "@storybook/react";

import { mockData } from "../Table/MOCK_DATA";
import { IOption, ISelectProps, Select } from "../../../src/fields";
import { Panel } from "../../../src/Panel";
import { SelectTest } from "./stateHelpers/SelectTest";

const values: IOption[] = mockData.slice(0, 30).map((el) => ({
    value: el.id,
    label: el.first_name + " " + el.last_name,
}));

storiesOf("Form/Fields/Select", module)
    .add("Base", () => {
        return (
            <Panel>
                <SelectTest options={values} value={1} />
            </Panel>
        );
    })
    .add("Allow clear", () => {
        return (
            <Panel>
                <SelectTest options={values} allowClear={true} value={1} />
            </Panel>
        );
    })
    .add("Search Field", () => {
        return (
            <Panel>
                <h3>Search field disabled</h3>
                <SelectTest options={values} value={1} showSearchField={false} />
                <h3>Search field enabled always</h3>
                <SelectTest
                    options={values.slice(0, 3)}
                    value={1}
                    showSearchField={true}
                    minLengthToShowSearchField={0}
                />
                <h3>Enabled if length > 6</h3>
                <div style={{ margin: 10 }}>
                    <b>List ( length=3)</b>
                </div>
                <SelectTest
                    options={values.slice(0, 3)}
                    value={1}
                    showSearchField={true}
                    minLengthToShowSearchField={6}
                />
                <div style={{ margin: 10 }}>
                    <b>List ( length=9)</b>
                </div>
                <SelectTest
                    options={values.slice(0, 9)}
                    value={1}
                    showSearchField={true}
                    minLengthToShowSearchField={6}
                />
            </Panel>
        );
    })
    .add("Not editable", () => {
        return (
            <Panel>
                <SelectTest options={values} value={1} editable={false} />
            </Panel>
        );
    });
