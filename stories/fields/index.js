import React from 'react';
import { storiesOf } from '@storybook/react';
import { action, decorateAction } from '@storybook/addon-actions';
import Panel from '../../src/ctrl/Panel';
import { BForm, BText, BSwitch, BSelect, BCheckboxGroup, BTextarea, BButtonsBar } from '../../src/layout/BootstrapForm'
import { Text, Switch, Select, CheckboxGroup, Textarea, Date } from '../../src/ctrl/Fields'




const formImport = `
        ~~~js
        import { Text, Switch, Select, CheckboxGroup, Textarea } from "frontend/lib/ctrl/Fields"
        ~~~
        `;

storiesOf('Fields', module)
    .addWithInfo(
    'All fields',
    'Tutaj opis',
    () => (
        <Panel>
            <table className="storyTable">
                <tbody>
                    <tr>
                        <td>Text</td>
                        <td><Text /></td>
                    </tr>
                    <tr>
                        <td>Switch</td>
                        <td><Switch options={{ 1: 'One', 2: 'Two', 3: 'Three' }} /></td>
                    </tr>
                    <tr>
                        <td>Select</td>
                        <td><Select options={{ 1: 'One', 2: 'Two', 3: 'Three' }} /></td>
                    </tr>
                    <tr>
                        <td>CheckboxGroup</td>
                        <td><CheckboxGroup options={{ 1: 'One', 2: 'Two', 3: 'Three' }} /></td>
                    </tr>
                    <tr>
                        <td>Textarea</td>
                        <td><Textarea /></td>
                    </tr>
                    <tr>
                        <td>Date</td>
                        <td><Date /></td>
                    </tr>
                </tbody>
            </table>
        </Panel>
    ))
