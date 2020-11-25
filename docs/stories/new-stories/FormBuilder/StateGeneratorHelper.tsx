import * as React from "react";
import { FormBuilder, IFormBuilderProps } from "../../../../src/FormBuilder";
import { FormBuilderSchemaGenerator } from "../../../../src/FormBuilder/FormBuilderSchemaGenerator";

export class StateGeneratorHelper extends React.Component<IFormBuilderProps, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            fields: [
                {
                    type: "BText",
                    name: "invoice",
                    label: "Nr. faktury",
                    required: 0,
                    default: null,
                    layoutConfig: null,
                },
                {
                    type: "BText",
                    name: "date",
                    label: "Data od",
                    required: 0,
                    default: null,
                    layoutConfig: null,
                },
                {
                    type: "BDate",
                    name: "date_to",
                    label: "Data do",
                    required: 0,
                    default: null,
                    layoutConfig: null,
                },
                {
                    type: "BTextarea",
                    name: "comment",
                    label: "Komentarz",
                    required: 0,
                    default: null,
                    layoutConfig: null,
                },
                {
                    type: "BText",
                    name: "user",
                    label: "Login",
                    required: 0,
                    default: null,
                    layoutConfig: null,
                },
                {
                    label: "Nb. of cars",
                    type: "BSelect",
                    default: "1",
                    name: "select",
                    options: [
                        { label: "zero", value: 0 },
                        { label: "one", value: 1 },
                        { label: "two", value: 2 },
                    ],
                },
            ],
        };
    }

    public render() {
        return (
            <>
                <FormBuilderSchemaGenerator
                    {...this.props}
                    fields={this.state.fields}
                    onChange={(data) => this.setState({ fields: data })}
                />
            </>
        );
    }
}
