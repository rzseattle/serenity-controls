import React from "react";
import { storiesOf } from "@storybook/react";

import { TabPane, Tabs } from "../../src/ctrl/Tabs";
import Panel from "../../src/ctrl/Panel";
// @ts-ignore
import { withKnobs, radios } from "@storybook/addon-knobs";
import { LoaderContainer } from "../../src/ctrl/LoaderContainer";
import { Datasource } from "../../src/lib/Datasource";
import { ConnectionsField, IConnectionElement } from "../../src/ctrl/fields/ConnectionsField";

const options = {
    "Tab 1": "1",
    "Tab 2": "2",
};

const action = (info: string) => alert(info);

storiesOf("Connection Field", module).add("Base", () => {
    const fn = (searchString: string, selected: string[]) => {
        return Datasource.from<IConnectionElement[]>((input) => {
            return [{ label: "xxx", value: 1 }, { label: "yyy", value: 2 }, { label: "ccc", value: 3 }].filter((el) => {
                console.log(selected.includes(el.value + ""));
                return !selected.includes(el.value + "") && el.label.indexOf(searchString) !== -1;
            });
        });
    };

    return (
        <Panel>
            <ConnectionsField  searchResultProvider={fn} editable={true} />
        </Panel>
    );
});
