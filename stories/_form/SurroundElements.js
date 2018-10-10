import React from 'react';
import {withFormField, BForm} from '../../src/ctrl/form/BForm'
import {Select, Text, Textarea} from '../../src/ctrl/Fields'

 class SurroundElements extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {
                textarea: 'initial data',
                other: 'static value'
            },
            submit: {}
        };
    }


    render() {

        const WrappedText = withFormField(Text);
        const WrappedSelect = withFormField( Select );
        const WrappedTextarea = withFormField( Textarea );


        return (
            <BForm
                data={this.state.data}
                onChange={(data) => {
                    let d = data.form.getData();
                    this.setState({data: {...d, 'textarea': d.text + ' x1' }});


                }}
                ref="form"
            >
                <WrappedText label="Wrapped text" />
                <WrappedSelect label="Wrapped select" />
                <WrappedTextarea label="Wrapped textarea" />


                <h5>Current data</h5>
                <pre>
                    {JSON.stringify(this.state.data, null, 2)}
                </pre>
                <h5>Submited data</h5>
                <pre>
                    {JSON.stringify(this.state.submit, null, 2)}
                </pre>
            </BForm>
        )
    }
}

export  default  SurroundElements;