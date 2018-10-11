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

class TMP extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            value: "xxx",
        };
    }

    public render() {
        return (
            <>
                <a
                    onClick={() => {
                        this.setState({ value: "bbb" });
                    }}
                >
                    xxx
                </a>
                <Wysiwyg value={this.state.value} onChange={(ev) => this.setState({ value: ev.value })} />
            </>
        );
    }
}

storiesOf("Wysiwig Field", module)
    .addDecorator(withKnobs)
    .add("Base", () => {
        return (
            <Panel>
                <TMP />
            </Panel>
        );
    });
