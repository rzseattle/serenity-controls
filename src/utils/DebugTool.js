import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Panel from 'frontend/src/ctrl/Panel';
import {TabPane, Tabs} from 'frontend/src/ctrl/Tabs';
import Inspector from 'react-json-inspector';

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            errors: [],
            currTab: 1
        };

        window.onerror = (msg) => {
            this.state.errors.push(msg);
            this.forceUpdate();
        };

    }

    render() {

        let s = this.state;
        return <div className={'w-debug-tool'}
                    tabIndex={1}
                    /*onBlur={() => this.setState({expanded: !s.expanded})}*/
        >
            <div
              className="collapsed"
              onClick={() => this.setState({expanded: !s.expanded})}


            >
                {s.errors.length > 0 && <span className="errors">{s.errors.length}</span>}
                <i className="fa fa-cog"></i>
            </div>

            {s.expanded && <div className="expanded">
                <Body
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
                <TabPane title={'Props'}>
                    <div className="props">
                        <a onClick={() => p.propsReloadHandler()} className="btn btn-xs btn-default">Reload props</a>




                        <Inspector data={ p.props }
            interactiveLabel={interactiveLabel}  />

                        {/*<pre style={{borderRadius: 0, fontSize: 11}}>{JSON.stringify(p.props, null, 2)}</pre>*/}


                    </div>
                </TabPane>
                <TabPane title={'Log'}>log</TabPane>
                <TabPane title={'Error'} badge={p.errors.length}>


                    <div>
                        {p.errors.map((e, i) => <div key={i}>{e}</div>)}
                    </div>
                </TabPane>
            </Tabs>
        </div>;
    }
}


let interactiveLabel = React.createClass({
    getDefaultProps: function() {
        return {
            value: ''
        };
    },
    render: function() {
        return input({
            className: 'json-inspector__selection',
            value: this.props.value,
            size: Math.max(1, this.props.value.length),
            spellCheck: false,
            onClick: this.onClick,
            onFocus: this.onFocus,
            onChange: this.onChange
        });
    },
    onChange: function() {},
    onClick: function(e) {
        e.stopPropagation();
    },
    onFocus: function(e) {
        e.target.select();
    }
});
