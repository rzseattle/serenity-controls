import React from 'react';
import {BForm, BText, BSwitch, BSelect, BCheckboxGroup, BTextarea, BButtonsBar, BDate, BFile} from '../../src/layout/BootstrapForm'

export default class FileUpload extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {
            },
            submit: {},
            files: []
        };
    }

    handleFileChange(e) {

        this.setState({files: [e.target.files]});
    }

    render() {

        const server = 'http://localhost:3001';

        return (
            <BForm
                action={server + '/form/fileUpload'}
                data={this.state.data}
                files={this.state.files}
                onChange={(data) => {
                    this.setState({data: data.form.getData()});
                }}
                ref="form"
            >
                <BText label="Text" name="text"/>
                <BText label="Text" name="text[xxx]"/>
                <p>
                    <input type="file" onChange={this.handleFileChange.bind(this)}/>

                </p>


                <input type="submit" value="submit" className="btn btn-primary" onClick={(e) => this.setState({submit: this.refs.form.getData()})}/>

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

