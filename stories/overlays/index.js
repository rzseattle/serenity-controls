import React from 'react';
import {storiesOf} from '@storybook/react';

import Panel from '../../src/ctrl/Panel';
import {Modal, Shadow, withPortal} from '../../src/ctrl/Overlays'


const formImport = `
        ~~~js
        import { Text, Switch, Select, CheckboxGroup, Textarea } from "frontend/lib/ctrl/Fields"
        ~~~
        `;

let modalVisible = true;
storiesOf('Overlays', module)
    .addWithInfo(
        'Base',
        'Tutaj opis',
        () => (
            <Panel>
                Some content
                <br /><br /><br /><br />
                <div style={{width: '500px', height: '500px', position: 'relative'}} className="modal-container">

                </div>
                <br /><br /><br /><br />
                <Modal visible={modalVisible} container={'.modal-container'}>
                    Content
                    <button onClick={() => modalVisible = false}>hide</button>
                </Modal>
            </Panel>
        ))
