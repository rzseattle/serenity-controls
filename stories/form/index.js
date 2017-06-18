import React from 'react';
import { storiesOf } from '@storybook/react';
import { action, decorateAction } from '@storybook/addon-actions';
import Panel from '../../src/ctrl/Panel';
import { BForm, BText, BSwitch, BSelect, BCheckboxGroup, BTextarea, BButtonsBar , BDate, BFile} from '../../src/layout/BootstrapForm'
import { Text, Switch, Select, CheckboxGroup, Textarea } from '../../src/ctrl/Fields'




const formImport = `
        ~~~js
        import { BForm, BText, BSwitch, BSelect, BCheckboxGroup, BTextarea, BButtonsBar, BDate } from "frontend/lib/layout/BootstrapForm"
        ~~~
        `;

storiesOf('Bootstrap Forms', module)
    .addWithInfo(

    'Base ( layouts )',

    formImport,
    () => (
        <div style={{ maxWidth: '800px' }}>
            <Panel key="1">
                <BForm>
                    <BSelect name="select" label="Select" options={{ 1: 'One', 2: 'Two', 3: 'Three' }} />
                    <BCheckboxGroup inline name="checkboxGroup" label="Checkbox group" options={{ 1: 'One', 2: 'Two', 3: 'Three' }} />
                    <BSwitch inline name="radioGroup" label="Radio group" options={{ 1: 'One', 2: 'Two', 3: 'Three' }} />
                    <BTextarea name="textarea" label="Textarea" />
                    <BDate name="date" label="Date" />
                    <BFile name="file" label="File" />
                    <input type="submit" value="submit" className="btn btn-primary" />
                </BForm>
            </Panel>
            <Panel key="2">
                <BForm layoutType="horizontal">
                    <BSelect name="select" label="Select" options={{ 1: 'One', 2: 'Two', 3: 'Three' }} />
                    <BCheckboxGroup name="checkboxGroup" label="Checkbox group" options={{ 1: 'One', 2: 'Two', 3: 'Three' }} />
                    <BTextarea name="textarea" label="Textarea" />
                    <BDate name="date" label="Date" />
                    <BFile name="file" label="File" />
                    <BButtonsBar>
                        <input type="submit" value="submit" className="btn btn-primary" />
                    </BButtonsBar>
                </BForm>
            </Panel>
        </div>
    ))
    .addWithInfo(
    'Data Binding',
    formImport
    ,
    () => (
        <div style={{ maxWidth: '800px' }}>
            <Panel >
                <BForm data={{ select: 2, checkboxGroup: ['2'], textarea: 'value' }} onChange={(data) => { console.log(data.form.getData()) }}>
                    <BSelect name="select" label="Select" options={{ 1: 'One', 2: 'Two', 3: 'Three' }} />
                    <BCheckboxGroup name="checkboxGroup" label="Checkbox group" options={{ 1: 'One', 2: 'Two', 3: 'Three' }} />
                    <BTextarea name="textarea" label="Checkbox group" />
                    <BDate name="date" label="Date" />
                    <input type="submit" value="submit" className="btn btn-primary" />

                </BForm>
            </Panel>

        </div>
    ))
