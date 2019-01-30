import React from "react";
import { storiesOf } from "@storybook/react";

import { mockData } from "../Table/MOCK_DATA";
import { IOption, ISelectProps, Select } from "../../../src/fields";
import { Panel } from "../../../src/Panel";
import { CheckboxTest } from "./stateHelpers/CheckboxTest";

const values: IOption[] = mockData.slice(0, 30).map((el) => ({
    value: el.id,
    label: el.first_name + " " + el.last_name,
}));

class SelectTest extends React.Component<ISelectProps, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            value: props.value,
        };
    }

    public render() {
        return <Select {...this.props} value={this.state.value} onChange={(e) => this.setState({ value: e.value })} />;
    }
}

storiesOf("Field: Checkbox", module)
    .add("Base", () => {
        return (
            <Panel>
                <CheckboxTest value={1} checked={true} />
            </Panel>
        );
    })
    .add("Label", () => {
        return (
            <Panel>
                <CheckboxTest value={1} label="Label checbox test" checked={true} />
            </Panel>
        );
    })
    .add("Disabled edition", () => {
        return (
            <Panel>
                <h3>Checked</h3>
                <CheckboxTest value={1} checked={true} editable={false} />
                <hr />
                <h3>Unchecked</h3>
                <CheckboxTest value={1} editable={false} />
            </Panel>
        );
    });
