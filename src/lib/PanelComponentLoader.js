import React, {Component} from 'react';
import PropTypes from 'prop-types';
import DebugTool from '../utils/DebugTool'

var NotificationSystem = require('react-notification-system');


export default class PanelComponentLoader extends Component {

    static propTypes = {
        component: PropTypes.string.isRequired,
        requestURI: PropTypes.string.isRequired,

    };

    static ComponentProps = {
        _notification: PropTypes.func,
        _reloadProps: PropTypes.func,
        _goto: PropTypes.func,
        _log: PropTypes.func,
        _resolveComponent: PropTypes.func,
        baseURL: PropTypes.string
    };

    constructor(props) {
        super(props);
        this.state = {
            propsLoading: false,
            loadedProps: false,
            currComponent: global.ReactHelper.getWithData(props.component),
            log: []
        }
    }

    handleReloadProps(input = {}, callback = false) {
        this.setState({propsLoading: true});
        global.$.get(this.props.requestURI, {...input, __PROPS_REQUEST__: 1}, (data) => {
            this.setState({propsLoading: false, loadedProps: data});
            if (callback) {
                callback();
            }
        });
    }

    handleResolveComponent(path) {
        alert('Resolving component ' + path);

    }

    handleGoTo(path, input = {}) {
        this.setState({propsLoading: true});
        global.$.get(path, {...input, __PROPS_REQUEST__: 1}, (data) => {
            var stateObj = {};
            let urlParameters = Object.keys(input).map((i) => i + '=' + input[i]).join('&');
            history.pushState(stateObj, '', path + (urlParameters ? '?' : '') + urlParameters);
            this.setState({propsLoading: false, loadedProps: data, currComponent: global.ReactHelper.get(data.component)});
        });
    }

    handleNotifycation(message, title = '', options = {}) {
        let data = {title: title, message: message, ...{level: 'success', ...options}};

        this._notificationSystem.addNotification(data);

    }

    handleLog(message) {
        this.state.log.push({msg: message});
        this.forceUpdate();
    }

    render() {
        const s = this.state;
        const p = s.loadedProps || this.props;

        if (!s.currComponent) {
            return <div style={{padding: 10}}>
                <h3>Can't find component</h3>
                <pre>{p.component}</pre>
            </div>
        }
        let Component = s.currComponent._obj;

        return <div>
            {!PRODUCTION && <DebugTool
                props={p}
                log={s.log}
                propsReloadHandler={this.handleReloadProps.bind(this)}
                componentData={s.currComponent.data}
            />}

            <NotificationSystem ref={(ns) => this._notificationSystem = ns}/>

            <Component
                {...p}
                reloadProps={this.handleReloadProps.bind(this)}
                _notification={this.handleNotifycation.bind(this)}
                _log={this.handleLog.bind(this)}
                _reloadProps={this.handleReloadProps.bind(this)}
                _goto={this.handleGoTo.bind(this)}
                _resolveComponent={this.handleReloadProps.bind(this)}
            />

        </div>

    }
}
