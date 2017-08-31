import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {TabPane, Tabs} from 'frontend/src/ctrl/Tabs';
import JSONTree from 'react-json-tree';


export default class extends React.Component {

    constructor(props) {
        super(props);
        let savedData = window.localStorage['DebugToolData'] || false;
        if (savedData) {
            savedData = JSON.parse(savedData);
        }


        this.state = {
            expanded: savedData.expanded,
            errors: [],
            currTab: savedData.selectedTab,

            style: {
                left: savedData.left,
                top: savedData.top
            }
        };

        window.onerror = (msg) => {
            this.state.errors.push(msg);
            this.forceUpdate();
        };

        this.listeners = {
            _handleKeyDown: this._handleKeyDown.bind(this),
            _mouseMove: this._mouseMove.bind(this),
            _end: this._end.bind(this)
        };
        this.dragTimeout = null;
    }


    _handleKeyDown(e) {
        if (e.keyCode == 27) { //esc
            this.setState({expanded: !this.state.expanded});
        }
    }


    componentWillMount() {
        document.addEventListener('keydown', this.listeners._handleKeyDown);
    }


    componentWillUnmount() {
        document.removeEventListener('keydown', this.listeners._handleKeyDown);
    }

    handleExpand() {
        this.setState({expanded: !this.state.expanded}, this.saveData);
    }

    _mouseMove(e) {
        this.setState({style: {left: e.clientX + 5, top: e.clientY - 5, right: 'auto'}});
    }

    _drag(e) {
        e.preventDefault();
        this.dragTimeout = setTimeout(() => {
            document.addEventListener('mousemove', this.listeners._mouseMove);
            document.addEventListener('mouseup', this.listeners._end);
        }, 300);
    }

    _end() {
        document.removeEventListener('mousemove', this.listeners._mouseMove);
        document.removeEventListener('mouseup', this.listeners._end);
        this.saveData();
    }

    saveData() {
        window.localStorage['DebugToolData'] = JSON.stringify({
            expanded: this.state.expanded,
            left: this.state.style.left,
            top: this.state.style.top,
            selectedTab: this.state.currTab
        });
    }

    render() {

        let s = this.state;
        return <div className={'w-debug-tool'}
                    tabIndex={1}
                    style={this.state.style}

        >
            <div
              className="collapsed"
              onClick={this.handleExpand.bind(this)}
              onMouseDown={this._drag.bind(this)}
              onMouseUp={() => clearTimeout(this.dragTimeout)}

            >
                <i className="fa fa-cog"></i>
                {s.errors.length > 0 && <span className="errors">{s.errors.length}</span>}
                {this.props.log.length > 0 && <span className="log">{this.props.log.length}</span>}
            </div>

            {s.expanded && <div className="expanded">
                <Body
                  log={this.props.log}
                  props={this.props.props}
                  errors={this.state.errors}
                  currTab={this.state.currTab}
                  onTabChange={(index) => this.setState({currTab: index})}
                  propsReloadHandler={this.props.propsReloadHandler}
                />
            </div>}

        </div>;
    }
}

class Body extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            expanded: false
        };

    }

    render() {
        let p = this.props;
        return <div>
            <Tabs
              defaultActiveTab={p.currTab}
              onTabChange={p.onTabChange}

            >
                <TabPane title={'Props'} badge={Object.entries(p.props).length}>
                    <div className="props">
                        <a onClick={() => p.propsReloadHandler()} className="btn btn-xs btn-default">Reload props</a>
                        <JSONTree data={p.props} hideRoot={true} invertTheme={true}/>
                    </div>
                </TabPane>
                <TabPane title={'Log'} badge={p.log.length}>
                    <div className="log">
                        <JSONTree data={p.log} invertTheme={true} hideRoot={true}/>
                        {p.log.length == 0 ? <div className={'empty'}>--Empty--</div> : null}
                    </div>
                </TabPane>
                <TabPane title={'Error'} badge={p.errors.length}>


                    <div>
                        {p.errors.map((e, i) => <div key={i}>{e}</div>)}
                        {p.errors.length == 0 ? <div className={'empty'}>--Empty--</div> : null}
                    </div>
                </TabPane>
            </Tabs>
        </div>;
    }
}
