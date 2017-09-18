import React from 'react'
import ReactDOM from 'react-dom'
import {SourceMapConsumer} from 'source-map';
import parse from '../../../react-error-overlay/lib/utils/parser';

var sourceMap = require('source-map');
export default class ErrorReporter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            file: [],
            stacks: []
        }
    }

    componentDidMount() {

        let e = this.props.error;


        let stacks = parse(e.stack);
        fetch(window.location.protocol + '//localhost:3000/bundle.js.map', {
            method: 'get'
        }).then((response) => {
                response.text().then((rawSourceMapJsonData) => {

                        var consumer = new sourceMap.SourceMapConsumer(rawSourceMapJsonData);
                        stacks.forEach(stack => {
                            this.state.stacks.push(consumer.originalPositionFor({line: stack.lineNumber, column: stack.columnNumber}));
                        });

                        fetch(window.location.protocol + '//localhost:3000/debug/getFile?file=' + this.state.stacks[0].source, {
                            method: 'get'
                        }).then((response) => {
                            response.text().then((text) => {
                                let lines = text.split('\n');
                                let line = this.state.stacks[0].line;
                                let presented = [];
                                for (let i = line - 5; i <= line + 5; i++) {
                                    presented.push({line: i + 1, content: lines[i]});
                                }

                                this.setState({file: presented})
                                this.forceUpdate();
                            });


                        }).catch(function (err) {
                            alert('Server get file error');
                        });

                    }
                )
            }
        )

        return;
    }


    render() {
        if (this.state.stacks.length == 0) {
            return <i className="fa fa-spinner fa-spin"></i>
        }

        let e = this.props.error;
        let message = e.stack.split('\n')[0];

        let containerCss = {backgroundColor: 'white', padding: 5, margin: 5, border: 'solid 1px grey'};
        let messageCss = {color: 'darkred', marginTop: 5};
        let codeCss = {whiteSpace: 'pre', backgroundColor: '#FDF3F4', color: 'black', padding: 5};


        let line = this.state.stacks[0].line;


        return <div style={containerCss}>
            <h3 style={messageCss}>{message}</h3>
            {/*<h4 style={{color: 'black'}}>{currentMethod}()</h4>*/}
            <div style={codeCss}>
                {this.state.file.map(el => {
                    if (el.line == line) {
                        return <div style={{backgroundColor: '#FCCFCF'}} >
                            <div style={{display: 'inline-block', width: 30}}>{el.line} |</div>
                            {el.content}</div>
                    } else {
                        return <div style={{backgroundColor: ''}} >
                            <div style={{display: 'inline-block', width: 30}}>{el.line} |</div>
                            {el.content}</div>
                    }

                })}
            </div>
            <h4><a href={`phpstorm://open?url=file://${this.state.stacks[0].source}&line=${this.state.stacks[0].line}`}>{this.state.stacks[0].source}:{this.state.stacks[0].line}</a></h4>
            {this.state.stacks.map(e => <div key={e.line}>{e.source}:{e.line}</div>)}

        </div>
    }
}
