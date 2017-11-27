import * as NotificationSystem from "react-notification-system";
import {toJS} from "mobx";

declare var PRODUCTION: boolean;
import * as React from "react";
import * as Notifications from "react-notification-system";
import Comm from './Comm'
import {DebugTool} from "../utils/DebugTool"

//declare var Views: any;
import *  as Views from "../../../../build/js/tmp/components.include";

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
    _reloadProps: { (args?: any, callback?: { (): any }): any };
    _goto: { (componentPath: string, args?: any): any };
    _log: { (element: any): any };
    _resolveComponent: { (componentPath: string): React.ReactElement<any> }
}

interface IProps {
    store: any;
}

interface IState {
    log: Array<any>
    debugToolLoaded: boolean,
    hasError: boolean,
    error: any,
}

@observer
export default class PanelComponentLoader extends React.Component<IProps, IState> {

    _notificationSystem: any;
    DebugTool: any = null;

    constructor(props) {
        super(props);
        this.state = {
            log: [],
            debugToolLoaded: false,
            hasError: false,
            error: false
        }

    }

    componentDidCatch(error, info) {
        // Display fallback UI
        if (!PRODUCTION) {

        }
        this.setState({hasError: true, error: error});
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
    }


    handleReloadProps(input = {}, callback: () => any) {
        this.props.store.changeView(null, input, callback);
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

        let DebugTool = this.DebugTool;
        let debugVar = {
            log: s.log,
            propsReloadHandler: this.handleReloadProps.bind(this),
            componentData: {},
            props: p.store.viewData,
            store: p.store
        };

        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <div>
                <h1>Something went wrong.</h1>
                {!PRODUCTION && this.state.debugToolLoaded && <DebugTool error={this.state.error}  {...debugVar} />}

            </div>;
        }


        let notificaton = {
            ref: (ns) => this._notificationSystem = ns
        }


        return <div className={p.store.viewComponentName}>

            {!PRODUCTION && this.state.debugToolLoaded && <DebugTool {...debugVar} />}

            <Notifications {...notificaton} />
            {this.props.store.viewServerErrors != null && <div>
                <div style={{padding: 10, backgroundColor: 'white', margin: 15}} dangerouslySetInnerHTML={{__html: this.props.store.viewServerErrors}}/>
            </div>}


            {Component && <Component
                {...toJS(p.store.viewData)}
                reloadProps={this.handleReloadProps.bind(this)}
                _notification={this.handleNotifycation.bind(this)}
                _log={this.handleLog.bind(this)}
                _reloadProps={this.handleReloadProps.bind(this)}
                _goto={this.handleGoTo.bind(this)}
                _resolveComponent={this.handleReloadProps.bind(this)}
                _scrollTo={(el) => {

                }}
            />}

            {(Component == undefined && p.store.viewComponentName != null) && <div style={{padding: 10}}>
                <h3>Can't find component</h3>
                <pre>"{p.store.viewComponentName}"</pre>
            </div>}

            {p.store.viewComponentName == null && <div>Loading...</div>}


        </div>

    }
}

class ErrorReporterLoader extends React.Component<any, any> {

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            component: null
        }
    }

    componentDidMount() {
        import
            ("./ErrorReporter").then((Reporter) => {
            this.setState({loaded: true, component: Reporter.default});
        });
    }


    render() {
        if (!this.state.loaded) {
            return <div>Loading ...</div>
        } else {
            let Component = this.state.component;
            return <Component error={this.props.error}/>
        }
    }
}

