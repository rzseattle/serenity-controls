import * as React from "react";

import { CheckboxGroup, ICheckboxGroupProps } from "../../../../../src/fields";

export class CheckboxGroupTest extends React.Component<ICheckboxGroupProps, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            value: props.value,
        };
    }

    public render() {
        return (
            <>
                <CheckboxGroup
                    {...this.props}
                    value={this.state.value}
                    onChange={(e) => this.setState({ value: e.value })}
                />
                {/*<PrintJSON json={this.state.value} />*/}
            </>
        );
    }
}
