import React from 'react';
import ReactDOM from 'react-dom';
import {storiesOf} from '@storybook/react';

import Panel from '../../src/ctrl/Panel';
import {Row} from '../../src/layout/BootstrapLayout';
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
            opened: false,
            tooltipTrigger: null,
            position: 'center',
            tooltipLoading: true
        }

        this.tootlipTimeout = null;

    }

    handleHover(e) {
        clearTimeout(this.tootlipTimeout);
        this.setState({
            tooltipTrigger: e.target,
            content: (new Date().getTime() ) + '',
            position: e.target.innerHTML,
            tooltipLoading: true
        });
        this.tootlipTimeout = setTimeout(() => this.setState({tooltipLoading: false}), 1000)

    }

    handleOut(e) {
        //this.setState({tooltipTrigger: null});
    }

    render() {
        let style = {
            border: 'solid 1px black',
            padding: '20px',
            margin: '30px auto',
            width: '200px',
            textAlign: 'center',
            backgroundColor: 'rgb(245,245,245)'
        };
        const s = this.state;
        return ( <div>


            <Row>

                <div
                    style={style}
                    onMouseEnter={this.handleHover.bind(this)}
                    onMouseOut={this.handleOut.bind(this)}
                >
                    top
                </div>
                <div
                    style={style}
                    onMouseEnter={this.handleHover.bind(this)}
                    onMouseOut={this.handleOut.bind(this)}
                >bottom
                </div>
            </Row>
            <Row>
                <div
                    style={style}
                    onMouseEnter={this.handleHover.bind(this)}
                    onMouseOut={this.handleOut.bind(this)}
                >left
                </div>
                <div
                    style={style}
                    onMouseEnter={this.handleHover.bind(this)}
                    onMouseOut={this.handleOut.bind(this)}
                >right
                </div>
            </Row>

            <Row>
                <div
                    style={style}
                    onMouseEnter={this.handleHover.bind(this)}
                    onMouseOut={this.handleOut.bind(this)}
                >right bottom
                </div>
                <div
                    style={style}
                    onMouseEnter={this.handleHover.bind(this)}
                    onMouseOut={this.handleOut.bind(this)}
                >left top
                </div>

            </Row>

            <Tooltip placement={this.state.position} ref="tooltip" target={this.state.tooltipTrigger}>
                {s.tooltipLoading ?
                    <div><i className="fa fa-spin fa-spinner"></i></div>
                    :
                    <div>
                        <h5>Tutaj treść</h5>
                        <p>{s.content}</p>
                    </div>
                }
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
    .addWithInfo(
        'Tooltip2',
        'Tutaj opis',
        () => (
            <Panel>
                <TooltipExample/>
            </Panel>
        ))
