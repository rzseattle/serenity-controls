import * as React from "react";
import { ISelectProps, Select } from "../../../../../src/fields";

export class SelectTest extends React.Component<ISelectProps, any> {
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
