import * as React from "react";
import { FormBuilder, IFormBuilderProps } from "../../../../src/FormBuilder";
import { PrintJSON } from "../../../../src/PrintJSON";

export class StateHelper extends React.Component<IFormBuilderProps, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            values: props.values,
        };
    }

    public render() {
        return (
            <>
                <FormBuilder
                    {...this.props}
                    values={this.state.value}
                    onChange={(data) => this.setState({ value: data })}
                />
                <PrintJSON json={this.state.value} />
            </>
        );
    }
}
