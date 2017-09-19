declare var PRODUCTION: boolean;
declare var global: any;
import * as React from "react";
import * as Notifications from "react-notification-system";
import Comm from './Comm'
import {DebugTool} from '../utils/DebugTool'


export interface IArrowViewComponentProps {
    baseURL: string;
    _notification: (content: string, title?: string, conf?: object) => any;
    _reloadProps: () => any;
    _goto: (componentPath: string, args?: any) => any;
    _log: (element: any) => any;
    _resolveComponent: (componentPath: string) => React.ReactElement<any>
}

interface IProps {
    requestURI: string;
    component: string

}

interface IState {
    currComponent: any,
    loading: boolean,
    loadedProps: any,
    log: Array<any>

}

export default class PanelComponentLoader extends React.Component<IProps, IState> {

    _notificationSystem: any;
    state: IState;

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            loadedProps: false,
            currComponent: global.ReactHelper.getWithData(props.component),
            log: []
        }
    }

    handleReloadProps(input = {}, callback: () => any) {
        this.setState({loading: true});
        Comm._post(this.props.requestURI, {...input, __PROPS_REQUEST__: 1}).then((data) => {
            this.setState({loading: false, loadedProps: data});
            if (callback) {
                callback();
            }
        });
    }

    handleResolveComponent(path) {
        alert('Resolving component ' + path);

    }

    handleGoTo(path, input = {}) {
        this.setState({loading: true});
        Comm._post(path, {...input, __PROPS_REQUEST__: 1}).then((data) => {
            var stateObj = {};
            input = {_rch: 1, ...input};
            let urlParameters = Object.keys(input).map((i) => i + '=' + input[i]).join('&');
            //history.pushState(stateObj, '', path + (urlParameters ? '?' : '') + urlParameters);
            window.location.hash = path + (urlParameters ? '?' : '') + urlParameters;
            this.setState({loading: false, loadedProps: data, currComponent: global.ReactHelper.get(data.component)});
        });
    }

    handleNotifycation(message, title = '', options = {}) {
        let data = {title: title, message: message, ...{level: 'success',   ...options}};

        this._notificationSystem.addNotification(data);

    }

    handleLog(message) {
        this.state.log.push({msg: message});
        this.setState(null);
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

        let notificaton = {
            ref: (ns) => this._notificationSystem = ns
        }

        return <div>
            {!PRODUCTION && <DebugTool {...debugVar} />}
            {this.state.loading && <div className="w-loader" style={{position: 'absolute', right: 10, top: 15}}>
                <span><i></i><i></i><i></i><i></i></span>
            </div>}



            <Notifications {...notificaton} />

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
