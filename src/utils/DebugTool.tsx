import * as React from "react";
import PropTypes from 'prop-types';
import {TabPane, Tabs} from '../ctrl/Tabs';
import JSONTree from 'react-json-tree';
import {Modal} from '../ctrl/Overlays';
import ErrorReporter from '../lib/ErrorReporter';
import Icon from "frontend/src/ctrl/Icon";
import Comm from "frontend/src/lib/Comm";
import {DevProperties} from "./DevProperties"
import {Copyable} from "frontend/src/ctrl/Copyable";
import *  as ViewsRoute from "../../../../build/js/tmp/components-route.include.js";

declare var DEV_PROPERIES: DevProperties;

interface IDebugToolProps {
    props: any,
    store: any,
    log: any,
    propsReloadHandler: any,
    error?: any,
    componentInfo: any,
}

//todo js -> ts
export class DebugTool extends React.Component<IDebugToolProps, any> {


    private listeners: any;
    private dragTimeout: any;
    private errorModal: any;


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
            lastError: props.error,
            routes: null,

            style: {
                left: savedData.left,
                top: savedData.top
            }
        };

        window.onerror = (messageOrEvent, source, lineno, colno, error) => {

            this.state.errors.push(messageOrEvent);
            this.setState({lastError: error});
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
        if (e.keyCode === 27) { //esc
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

        let {componentInfo} = this.props;


        let extendedInfo = componentInfo ? componentInfo.extendedInfo : null;
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

                <Icon name={"Edit"}/>
                {s.errors.length > 0 && <span className="errors">{s.errors.length}</span>}
                {this.props.log.length > 0 && <span className="log">{this.props.log.length}</span>}
            </div>

            {s.expanded && <div className="expanded">

                <div className='toolbar btn-toolbar'>

                    <a onClick={() => this.props.propsReloadHandler()} className="btn btn-sm btn-default"><Icon name={"Sync"}/> Reload props </a>
                    {extendedInfo && <>
                        <a href={`phpstorm://open?url=file://${DEV_PROPERIES.project_dir}${extendedInfo._debug.file}&line=${extendedInfo._debug.line}`} className="btn btn-default btn-sm">
                            <Icon name={"FileCode"}/> edit backend
                        </a>
                        <a href={`phpstorm://open?url=file://${DEV_PROPERIES.project_dir}${extendedInfo._debug.template}.component.tsx&line=1`} className="btn btn-default btn-sm"><Icon name={"Code"}/> edit frontend</a>

                    </>}

                </div>
                <Body
                    log={this.props.log}
                    props={this.props.props}
                    errors={this.state.errors}
                    currTab={this.state.currTab}
                    onTabChange={(index) => this.setState({currTab: index})}
                    routeInfo={ViewsRoute.ViewFileMap[this.props.store.viewURL]}
                />
                {/*this.state.routes && this.state.routes[this.props.store.viewURL] ? this.state.routes[this.props.store.viewURL] : null*/}
            </div>}
            <Modal
                show={this.state.lastError != null}
                onHide={() => this.setState({lastError: null})}
                ref={modal => this.errorModal = modal}

            >
                <div style={{maxWidth: 800}}>
                    <ErrorReporter error={this.state.lastError}/>
                </div>
            </Modal>

        </div>;
    }
}


class Body extends React.Component<any, any> {


    constructor(props) {
        super(props);
        this.state = {
            expanded: false
        };

    }

    render() {
        let p: any = this.props;

        let componentProps = {};
        let debug = {};
        Object.entries(p.props).map(([key, value]) => {
            if (key.indexOf('__debug') !== -1) {
                debug[key.replace('__debug', '')] = value;
            } else {
                componentProps[key] = value;
            }
        });


        return <div>

            <Tabs
                defaultActiveTab={p.currTab}
                onTabChange={p.onTabChange}
            >
                <TabPane title={'Props'} badge={Object.entries(p.props).length} icon="bars">
                    <div className="props">
                        <JSONTree data={componentProps} hideRoot={true} invertTheme={true}/>
                    </div>
                </TabPane>
                <TabPane title={'Log'} badge={p.log.length} icon="pencil">
                    <div className="log">
                        {p.log.map(el => <JSONTree data={el} invertTheme={true} hideRoot={true}/>)}
                        {p.log.length == 0 ? <div className={'empty'}>--Empty--</div> : null}
                    </div>
                </TabPane>
                <TabPane title={'Error'} badge={p.errors.length} icon="bug">
                    <div className='error'>
                        {p.errors.map((e, i) => <div key={i}>{e}</div>)}
                        {p.errors.length == 0 ? <div className={'empty'}>--Empty--</div> : null}
                    </div>
                </TabPane>
                {p.routeInfo && <TabPane title={'Route info'} icon="Info">

                    <div style={{padding: 5}}>
                        <Copyable>
                            {p.routeInfo._controller}:{p.routeInfo._method}
                        </Copyable>
                    </div>
                    <div style={{padding: 5}}>
                        <Copyable>
                            {p.routeInfo._debug.file}:{p.routeInfo._debug.line}
                        </Copyable>
                    </div>

                </TabPane>}
                {Object.entries(debug).map(([key, value]) => {
                    return <TabPane key={key} title={key} icon="circle-o" badge={Object.entries(value).length}>
                        <div className='props'>
                            <JSONTree data={value} hideRoot={true} invertTheme={true}/>
                        </div>
                    </TabPane>
                })}
            </Tabs>

        </div>;
    }
}
