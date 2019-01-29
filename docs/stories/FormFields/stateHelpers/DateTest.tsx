import * as React from "react";
import {Date, IDateProps, ISelectProps, Select} from "../../../../src/fields";

export class DateTest extends React.Component<IDateProps, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            value: props.value,
        };
    }

    public render() {
        return <Date {...this.props} value={this.state.value} onChange={(e) => this.setState({ value: e.value })} />;
    }
}
