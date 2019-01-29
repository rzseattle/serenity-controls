import * as React from "react";

import { Checkbox, ICheckboxProps } from "../../../../src/fields/Checkbox";

export class CheckboxTest extends React.Component<ICheckboxProps, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            checked: props.checked,
        };
    }

    public render() {
        return (
            <Checkbox
                {...this.props}
                value={this.state.value}
                onChange={(e) => this.setState({ checked: e.data.checked })}
            />
        );
    }
}
