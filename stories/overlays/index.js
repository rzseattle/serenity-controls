import React from 'react';
import {storiesOf} from '@storybook/react';

import Panel from '../../src/ctrl/Panel';
import {Modal, Shadow, withPortal} from '../../src/ctrl/Overlays'


const formImport = `
        ~~~js
        import { Text, Switch, Select, CheckboxGroup, Textarea } from "frontend/lib/ctrl/Fields"
        ~~~
        `;

class Base extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true
        }
    }

    render() {
        return (
            <Modal visible={this.state.visible} closeLink={true}>
                <a className="w-modal-close" style={{}} onClick={(e) => this.setState({statusChangeOn: !this.state.statusChangeOn})}> <i className="fa fa-close"></i></a>
                <div style={{padding: '20px'}}>
                Content
                <button onClick={() => this.setState({visible: false})}>hide</button>
                </div>
            </Modal>
        )
    }
}

let modalVisible = true;
storiesOf('Overlays', module)
    .addWithInfo(
        'Base',
        'Tutaj opis',
        () => (
            <Panel>
                Some content
                <br/><br/><br/><br/>
                <div style={{width: '500px', height: '500px', position: 'relative'}} className="modal-container">

                </div>
                <br/><br/><br/><br/>
                <Base />
            </Panel>
        ))
