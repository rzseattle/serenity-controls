import React from 'react';
import ReactDOM from 'react-dom';
import {storiesOf} from '@storybook/react';

import Panel from '../../src/ctrl/Panel';
import {Modal, Shadow, Tooltip, withPortal} from '../../src/ctrl/Overlays'


const formImport = `
        ~~~js
        import { Text, Switch, Select, CheckboxGroup, Textarea } from "frontend/lib/ctrl/Fields"
        ~~~
        `;

class Base extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }

        setTimeout(() => this.setState({visible: true}), 500)
    }

    render() {
        return (
            <div>

                <Modal opened={this.state.visible} showClose={false}>
                    <div style={{padding: '20px'}}>
                        Content
                        <button onClick={() => this.setState({visible: false})}>hide</button>
                    </div>
                </Modal>
            </div>
        )
    }
}

class All extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            opened: false
        }

        setTimeout(() => this.setState({opened: true}), 500)
    }

    render() {
        return (
            <div>

                <Modal
                    opened={this.state.opened}

                    closeLink={true}
                    title="Modal test title"
                >

                    <div style={{padding: '20px'}}>
                        Content

                    </div>
                </Modal>
            </div>
        )
    }
}

class TooltipExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            opened: false
        }

    }

    render() {
        let style = {
            border: 'solid 1px black',
            padding: '20px',
            width: '200px',
            textAlign: 'center',
            backgroundColor: 'rgb(245,245,245)'
        };
        return ( <div>
            <div style={style} ref="top">Top</div>
            <Tooltip placement="top"  target={() => this.refs.top} >
                tooltip text
            </Tooltip>

            <div style={style} ref="bottom">Bottom</div>
            <Tooltip placement="bottom"  target={() => this.refs.bottom} >
                tooltip text
            </Tooltip>


            <div style={style} ref="left">left</div>
            <Tooltip placement="left"  target={() => this.refs.left} >
                tooltip text
            </Tooltip>
            <div style={style} ref="right">left</div>
            <Tooltip placement="right"  target={() => this.refs.right} >
                tooltip text
            </Tooltip>
        </div>)
    }
}




storiesOf('Overlays', module)
    .addWithInfo(
        'Modal naked',
        'Tutaj opis',
        () => (
            <Panel>
                <Base/>
                <div style={{width: '500px', height: '500px', position: 'relative'}} className="modal-container">
                </div>
            </Panel>
        ))

    .addWithInfo(
        'Modal all',
        'Tutaj opis',
        () => (
            <Panel>
                All
                <All/>
                <div style={{width: '500px', height: '500px', position: 'relative'}} className="modal-container">
                </div>
            </Panel>
        ))
    .addWithInfo(
        'Tooltip',
        'Tutaj opis',
        () => (
            <Panel>
                <TooltipExample/>
            </Panel>
        ))
