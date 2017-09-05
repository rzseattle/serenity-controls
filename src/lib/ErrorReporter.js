import React from 'react'
import ReactDOM from 'react-dom'
export default class ErrorReporter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            file: []
        }
    }

    componentDidMount() {

        let e = this.props.error;

        let rows = e.stack.split("\n");
        let message = rows[0];
        delete rows[0];
        let currentData = rows[1];
        delete rows[1];

        let tmp = currentData.split(" (");
        let currentMethod = tmp[0];
        let currentFile = tmp[1].replace(')', ' ').split(':');

        fetch(window.location.protocol + '//localhost:3000/debug/getFile?file=' + currentFile[0] + ':' + currentFile[1], {
            method: 'get'
        }).then((response) => {
            response.text().then((text) => {
                let lines = text.split('\n');
                let line = parseInt(currentFile[2]);
                let presented = [];
                for (let i = line - 5; i <= line + 5; i++) {
                    presented.push({line: i+1, content: lines[i]});
                }

                this.setState({file: presented})
            });
        }).catch(function (err) {
            alert('Server get file error');
        });
    }


    render() {
        let e = this.props.error;

        let containerCss = {backgroundColor: 'white', padding: 5, margin: 5, border: 'solid 1px grey'};
        let messageCss = {color: 'darkred', marginTop: 5};
        let codeCss = {whiteSpace: 'pre', backgroundColor: 'black', color: 'white', padding: 5};


        let rows = e.stack.split("\n");
        let message = rows[0];
        delete rows[0];
        let currentData = rows[1];
        delete rows[1];

        let tmp = currentData.split(" (");
        let currentMethod = tmp[0];
        let currentFile = tmp[1].replace(')', ' ').split(':');
        let line = parseInt(currentFile[2]);


        return <div style={containerCss}>
            <h3 style={messageCss}>{message}</h3>
            <h4 style={{color: 'black'}}>{currentMethod}()</h4>
            <div style={codeCss}>
                {this.state.file.map(el =>{
                    if(el.line == line) {
                        return <div style={{ backgroundColor:'#585858'}}>
                            <div style={{display: 'inline-block', width: 30}}>{el.line}</div>
                            {el.content}</div>
                    }else{
                        return <div style={{backgroundColor: ''}}>
                            <div style={{display: 'inline-block', width: 30}}>{el.line}</div>
                            {el.content}</div>
                    }

                })}
            </div>
            <h4><a href={`phpstorm://open?url=file://${currentFile[0]}:${currentFile[1]}&line=${currentFile[2]}`}>{currentFile[0]}:{currentFile[1]}:{currentFile[2]}</a></h4>
            {rows.map(e => <div>{e}</div>)}

        </div>
    }
}
