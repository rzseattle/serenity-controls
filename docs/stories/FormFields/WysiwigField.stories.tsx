import React from "react";
import { storiesOf } from "@storybook/react";

import { mockData } from "../Table/MOCK_DATA";
import { IOption, Select, Wysiwyg } from "../../../src/fields";
import { Panel } from "../../../src/Panel";
import { withKnobs, text } from "@storybook/addon-knobs";
const values: IOption[] = mockData.slice(0, 30).map((el) => ({
    value: el.id,
    label: el.first_name + " " + el.last_name,
}));

class WysiwigDemo extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            value: "This is wysig value",
        };
    }

    public render() {
        return (
            <>
                <a
                    onClick={() => {
                        this.setState({ value: "Changed value" });
                    }}
                    className="btn btn-default"
                >
                    Change content of wyswig
                </a>
                <Wysiwyg
                    value={this.state.value}
                    onChange={(ev) => {
                        this.setState({ value: ev.value });
                    }}
                />
            </>
        );
    }
}

storiesOf("Field: Wysiwig ", module)
    .addDecorator(withKnobs)
    .add("Base", () => {
        return (
            <Panel>
                <div style={{ height: 800 }}>
                    <WysiwigDemo />
                </div>
            </Panel>
        );
    })
    .add("Controled", () => {
        return (
            <Panel>
                <div style={{ height: 800 }}>
                    <Wysiwyg value={text("Content", "This is default content")} />
                </div>
            </Panel>
        );
    })
    .add("Not editable", () => {
        return (
            <Panel>
                <div style={{ height: 800 }}>
                    <Wysiwyg value={text("Content", "This is default content")} editable={false} />
                </div>
            </Panel>
        );
    });
