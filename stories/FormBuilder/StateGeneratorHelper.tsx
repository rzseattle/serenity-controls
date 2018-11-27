import * as React from "react";
import { FormBuilder, IFormBuilderProps } from "../../src/FormBuilder";
import { PrintJSON } from "../../src/PrintJSON";
import { FormBuilderSchemaGenerator } from "../../src/FormBuilder/FormBuilderSchemaGenerator";
import { Row } from "../../src/Row";

export class StateGeneratorHelper extends React.Component<IFormBuilderProps, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            fields: [],
        };
    }

    public render() {
        return (
            <>
                <Row md={[8,4]}>
                    <FormBuilderSchemaGenerator
                        {...this.props}
                        values={this.state.fields}
                        onChange={(data) => this.setState({ fields: data })}
                    />
                    <FormBuilder fields={this.state.fields} />
                </Row>
            </>
        );
    }
}
