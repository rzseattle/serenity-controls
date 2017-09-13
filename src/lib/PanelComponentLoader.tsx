declare var PRODUCTION: boolean;
declare var $: any;
declare var global: any;
import * as React from "react";
import * as Notifications from "react-notification-system";

import {DebugTool} from '../utils/DebugTool'


export interface IArrowViewComponentProps {
    baseURL: string;
    _notification: (content: string, title?: string, conf?: object) => any;
    _reloadProps: () => any;
    _goto: (componentPath: string) => any;
    _log: (element: any) => any;
    _resolveComponent: (componentPath: string) => React.ReactElement<any>
}

interface IProps {
    requestURI: string;
    component: string

}

interface IState {
    currComponent: any,
    propsLoading: boolean,
    loadedProps: any,
    log: Array<any>

}

export default class PanelComponentLoader extends React.Component<IProps, IState> {

    _notificationSystem: any;
    state: IState;

    constructor(props) {
        super(props);
        this.state = {
            propsLoading: false,
            loadedProps: false,
            currComponent: global.ReactHelper.getWithData(props.component),
            log: []
        }
    }

    handleReloadProps(input = {}, callback: () => any) {
        this.setState({propsLoading: true});
        $.get(this.props.requestURI, {...input, __PROPS_REQUEST__: 1}, (data) => {
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
        $.get(path, {...input, __PROPS_REQUEST__: 1}, (data) => {
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
        const p = s.loadedProps || {...this.props};

        if (!s.currComponent) {
            return <div style={{padding: 10}}>
                <h3>Can't find component</h3>
                <pre>{p.component}</pre>
            </div>
        }
        let Component = s.currComponent._obj;

        let debugVar = {
            log: s.log,
            propsReloadHandler: this.handleReloadProps.bind(this),
            componentData: s.currComponent.data,
            props: p

        };

        return <div>
            {!PRODUCTION&&<DebugTool {...debugVar} />}


            <Notifications ref={(ns) => this._notificationSystem = ns}/>

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
