import React from "react";
import { storiesOf } from "@storybook/react";

import { Wysiwyg } from "../../../../src/fields";
import { Panel } from "../../../../src/Panel";

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

storiesOf("Form/Fields/Wysiwig ", module)
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
                    <Wysiwyg value={"This is controled content"} />
                </div>
            </Panel>
        );
    })
    .add("Not editable", () => {
        return (
            <Panel>
                <div style={{ height: 800 }}>
                    <Wysiwyg value={"This is default content"} editable={false} />
                </div>
            </Panel>
        );
    });
