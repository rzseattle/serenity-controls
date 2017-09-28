import * as NotificationSystem from "react-notification-system";

declare var PRODUCTION: boolean;
import * as React from "react";
import * as Notifications from "react-notification-system";
import Comm from './Comm'
import {DebugTool} from '../utils/DebugTool'
import *  as Views from '../../../../build/js/tmp/components.include';
import {observer} from "mobx-react";

//console.log(Views);


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
    store: any;
}

interface IState {
    currComponent: any,
    loading: boolean,
    loadedProps: any,
    log: Array<any>
    debugToolLoaded: boolean,
    errorResponse: string
    hasError: boolean
}

@observer
export default class PanelComponentLoader extends React.Component<IProps, IState> {

    _notificationSystem: any;
    DebugTool: any = null;

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            loadedProps: false,
            currComponent: null,
            log: [],
            debugToolLoaded: false,
            errorResponse: null,
            hasError: false,
        }
        console.error("PanelComponentLoader", "constructor");


    }

    componentDidCatch(error, info) {
        // Display fallback UI
        this.setState({hasError: true});
        // You can also log the error to an error reporting service
        //logErrorToMyService(error, info);
    }

    componentWillMount() {
        if (!PRODUCTION) {
            //import {DebugTool} from '../utils/DebugTool'

            import
            ( /* webpackChunkName = "DebugTool" */ '../utils/DebugTool').then(({DebugTool}) => {
                this.DebugTool = DebugTool;
                this.setState({debugToolLoaded: true});

            });
        }

        //this.handleGoTo(this.props.view);

    }

    getComponentFromURL(url: string): string {
        url = url.split('?')[0].replace("#", "");
        return url.replace(/\//g, "_")
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

    handleComponentDisplay(path, data = {}) {

        //alert("ustaliłem");
        const name = this.getComponentFromURL(path);
        const currComponent = {
            name: name,
            request: path,
            data: {...data, baseURL: this.getBaseURL(path)}
        };


        this.setState({
            loading: false,
            currComponent: currComponent,
        });

        /*var stateObj = {};
                history.pushState(stateObj, '', path + (urlParameters ? '?' : '') + urlParameters);*/

    }


    handleGoTo(path, input = {}) {
        this.props.store.changeView(path, input);

    }

    handleResolveComponent(path) {
        alert('Resolving component ' + path);

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
        const p = this.props;
        let Component = Views[p.store.viewComponentName];

        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <h1>Something went wrong.</h1>;
        }


        let debugVar = {
            log: s.log,
            propsReloadHandler: this.handleReloadProps.bind(this),
            componentData: {},
            props: p.store.viewData
        };

        let notificaton = {
            ref: (ns) => this._notificationSystem = ns
        }

        let DebugTool = this.DebugTool;
        return <div className={p.store.viewComponentName}>


            {!PRODUCTION && false && this.state.debugToolLoaded && <DebugTool {...debugVar} />}
            {this.state.loading && <div className="w-loader" style={{position: 'absolute', right: 10, top: 60, zIndex: 100}}>
                <span><i></i><i></i><i></i><i></i></span>
            </div>}


            <Notifications {...notificaton} />
            {this.state.errorResponse != null && <div>
                <div style={{padding: 10, backgroundColor: 'white', margin: 15}} dangerouslySetInnerHTML={{__html: this.state.errorResponse}}/>
            </div>}

            {p.store.isViewLoading && <div>Laduje</div>}


            {Component && !p.store.isViewLoading && <Component
                {...p.store.viewData}
                reloadProps={this.handleReloadProps.bind(this)}
                _notification={this.handleNotifycation.bind(this)}
                _log={this.handleLog.bind(this)}
                _reloadProps={this.handleReloadProps.bind(this)}
                _goto={this.handleGoTo.bind(this)}
                _resolveComponent={this.handleReloadProps.bind(this)}
            />}

            {Component == undefined && <div style={{padding: 10}}>
                <h3>Can't find component</h3>
                <pre>"{p.store.viewComponentName}"</pre>
            </div>}


        </div>

    }
}
