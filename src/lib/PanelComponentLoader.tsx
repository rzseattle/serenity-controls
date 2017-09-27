import * as NotificationSystem from "react-notification-system";

declare var PRODUCTION: boolean;
declare var global: any;
import * as React from "react";
import * as Notifications from "react-notification-system";
import Comm from './Comm'
import {DebugTool} from '../utils/DebugTool'


export interface IArrowViewComponentProps {
    /**
     * Url without last action part
     */
    baseURL: string;
    /**
     * Display panel notification
     * @param {string} content Notification content
     * @param {string} title Notification title
     * @param {Object} conf Config object
     * @returns {any}
     * @private
     */
    _notification: { (content: string, title?: string, conf?: NotificationSystem.Notification): any };
    _reloadProps: { (): any };
    _goto: { (componentPath: string, args?: any): any };
    _log: { (element: any): any };
    _resolveComponent: { (componentPath: string): React.ReactElement<any> }
}

interface IProps {
    requestURI: string;
    component: string
    componentPath?: string
}

interface IState {
    currComponent: any,
    loading: boolean,
    loadedProps: any,
    log: Array<any>
    debugToolLoaded: boolean,
    baseURL: string
    errorResponse: string
}

export default class PanelComponentLoader extends React.Component<IProps, IState> {

    _notificationSystem: any;
    state: IState;
    DebugTool: any = null;

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            loadedProps: false,
            currComponent: global.ReactHelper.getWithData(props.component),
            log: [],
            debugToolLoaded: false,
            baseURL: this.getBaseURL(window.location.hash),
            errorResponse: null
        }


    }

    componentDidMount() {
        if (!PRODUCTION) {
            //import {DebugTool} from '../utils/DebugTool'

            import
            ( /* webpackChunkName = "DebugTool" */ '../utils/DebugTool').then(({DebugTool}) => {
                this.DebugTool = DebugTool;
                this.setState({debugToolLoaded: true});

            });
        }
        if (this.props.componentPath) {

            this.handleGoTo(this.props.componentPath);
        }
    }

    getBaseURL(url: string = null): string {
        let baseURL = url.split('?')[0].replace("#", "");
        let tmp = baseURL.split('/')
        baseURL = tmp.slice(0, -1).join('/');
        return baseURL;
    }


    handleReloadProps(input = {}, callback: () => any) {
        this.setState({loading: true});
        let url = window.location.hash.replace("#", "");
        Comm._post(url, {...input, __PROPS_REQUEST__: 1}).then((data) => {
            this.setState({loading: false, loadedProps: {...data, baseURL: this.getBaseURL(url)}});
            if (callback) {
                callback();
            }
        });
    }

    unstable_handleError() {
        alert('error');
    }

    handleResolveComponent(path) {
        alert('Resolving component ' + path);

    }

    componentWillReceiveProps(nextProps) {

        if (this.props.component != nextProps.component) {

            let component = global.ReactHelper.get(nextProps.component.replace(/\//g, "_"))

            if (component && component["_obj"].synch == true) {
                this.setState({
                    loading: false,
                    loadedProps: {baseURL: this.getBaseURL(nextProps.component)},
                    currComponent: component
                });
            } else {
                this.handleGoTo(nextProps.component);
            }
        }
    }

    handleGoTo(path, input = {}) {

        this.setState({loading: true, errorResponse: null});
        let pathQueryString = "";
        //jesli podano path w formie adresu z ? i parametrami
        if (path.indexOf("?") != -1) {
            [path, pathQueryString] = path.split("?");
        } else {
            let urlParameters = Object.keys(input).map((i) => i + '=' + input[i]).join('&');
            window.location.hash = path + (urlParameters ? '?' : '') + urlParameters;
        }
        let baseURL = this.getBaseURL(path);
        let componentPath = path.replace(/\//g, "_");

        let comm = new Comm(path + (pathQueryString ? "?" + pathQueryString : ""));
        comm.debug = false;
        comm.setData({...input, __PROPS_REQUEST__: 1});
        comm.on(Comm.EVENTS.ERROR, (errorResponse) => {
            this.setState({errorResponse: errorResponse, loading: false});
        });
        comm.on(Comm.EVENTS.SUCCESS, (data) => {
            console.log(data);
            var stateObj = {};

            //history.pushState(stateObj, '', path + (urlParameters ? '?' : '') + urlParameters);

            this.setState({
                loading: false,
                loadedProps: {...data, baseURL: baseURL},
                currComponent: global.ReactHelper.get(componentPath),
            });
        });

        comm.send();
    }

    handleNotifycation(message, title = '', options = {}) {
        let data = {title: title, message: message, ...{level: 'success', ...options}};

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
                <pre>"{p.component}"</pre>
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

        let DebugTool = this.DebugTool;
        return <div className={s.currComponent.key}>
            {!PRODUCTION && this.state.debugToolLoaded && <DebugTool {...debugVar} />}
            {this.state.loading && <div className="w-loader" style={{position: 'absolute', right: 10, top: 60, zIndex: 100}}>
                <span><i></i><i></i><i></i><i></i></span>
            </div>}


            <Notifications {...notificaton} />
            {this.state.errorResponse != null && <div>
                <div style={{padding: 10, backgroundColor: 'white', margin: 15}} dangerouslySetInnerHTML={{__html: this.state.errorResponse}}/>
            </div>}

            {(this.state.errorResponse == null) && <Component
                {...p}
                reloadProps={this.handleReloadProps.bind(this)}
                _notification={this.handleNotifycation.bind(this)}
                _log={this.handleLog.bind(this)}
                _reloadProps={this.handleReloadProps.bind(this)}
                _goto={this.handleGoTo.bind(this)}
                _resolveComponent={this.handleReloadProps.bind(this)}
            />}

        </div>

    }
}
