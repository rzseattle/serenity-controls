import * as NotificationSystem from "react-notification-system";
//import * as Notifications from "react-notification-system";
import {toJS} from "mobx";
import * as React from "react";


import {observer} from "mobx-react";
import {Copyable} from "frontend/src/ctrl/Copyable";
import Router from "frontend/src/backoffice/Router";

declare var PRODUCTION: boolean;
declare var window: any;

//console.log(Views);

let exampleComponent = `import * as React from "react";
import {IArrowViewComponentProps} from "frontend/src/lib/PanelComponentLoader";

import Navbar from "frontend/src/ctrl/Navbar";

interface IProps extends IArrowViewComponentProps {
}

export default class ArrowViewComponent extends React.Component<IProps, any> {
    public render() {
        return (
            <div>
                <Navbar>
                    <span>Path</span>
                </Navbar>
                <div>
                    <div className="panel-body-margins">
                        Content
                    </div>
                </div>
            </div>
        );
    }
}`;


export interface IArrowViewComponentProps {
    /**
     * Url without last action part
     */

    _baseURL: string;

    _basePath: string;
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
    _setPanelOption: { (name: string, value: string | number | boolean, callback?: { (): any }): any };
    _goto: { (componentPath: string, args?: any, callback?: { (): any }): any };
    _log: { (element: any): any };
    _resolveComponent: { (componentPath: string): React.ReactElement<any> }
    _startLoadingIndicator: { (): any };
    _stopLoadingIndicator: { (): any };
}

interface IProps {
    store: any;
    onLoadStart: { (): any };
    onLoadEnd: { (): any };
    setPanelOption: { (name: string, value: string | number | boolean, callback?: { (): any }): any };
}

interface IState {
    log: Array<any>
    debugToolLoaded: boolean,
    hasError: boolean,
    error: any,
    devComponentFile: string,
}

@observer
export default class PanelComponentLoader extends React.Component<IProps, IState> {

    _notificationSystem: any;
    DebugTool: any = null;
    private baseURL: string;

    constructor(props) {
        super(props);
        this.state = {
            log: [],
            debugToolLoaded: false,
            hasError: false,
            error: false,
            devComponentFile: null,
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
            import
                ( /* webpackChunkName = "DebugTool" */ '../utils/DebugTool').then(({DebugTool}) => {
                this.DebugTool = DebugTool;
                this.setState({debugToolLoaded: true});
            });
        }
    }


    handleReloadProps(input = {}, callback: () => any) {
        this.props.onLoadStart();
        this.props.store.changeView(null, input, () => {
            this.props.onLoadEnd();
            if (callback) {
                callback();
            }
        });
    }


    handleGoTo(path, input = {}, callback = null) {
        this.props.store.changeView(path, input, callback);
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
        let ComponentInfo: any = p.store.view;


        let DebugTool = this.DebugTool;
        let debugVar = {
            log: s.log,
            propsReloadHandler: this.handleReloadProps.bind(this),
            componentInfo: ComponentInfo,
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

        return <div className={ComponentInfo && ComponentInfo.extendedInfo.component}>

            {!PRODUCTION && this.state.debugToolLoaded && <DebugTool {...debugVar} />}

            <NotificationSystem {...notificaton} />
            {this.props.store.viewServerErrors != null && <div>
                <div style={{padding: 10, backgroundColor: 'white', margin: 15}} dangerouslySetInnerHTML={{__html: this.props.store.viewServerErrors}}/>
            </div>}


            {ComponentInfo ? <ComponentInfo.Component
                {...toJS(p.store.viewData, true)}
                reloadProps={this.handleReloadProps.bind(this)}
                baseURL={p.store.view.baseURL}
                _baseURL={p.store.view.baseURL}
                _basePath={p.store.basePath}
                _notification={this.handleNotifycation.bind(this)}
                _log={this.handleLog.bind(this)}
                _reloadProps={this.handleReloadProps.bind(this)}
                _setPanelOption={this.props.setPanelOption}
                _goto={this.handleGoTo.bind(this)}
                _resolveComponent={this.handleReloadProps.bind(this)}
                _startLoadingIndicator={this.props.onLoadStart}
                _stopLoadingIndicator={this.props.onLoadEnd}
                _scrollTo={(el) => {

                }}
            /> : !this.props.store.isViewLoading && <div style={{padding: 20}}>
                <h1>404 not found</h1>
                <div>Selected resource cannot be found</div>

            </div>}

            {(ComponentInfo == false && p.store.viewComponentName != null) && <div style={{padding: 10}}>
                <h3>Can't find component </h3>
                <pre>Route: "{p.store.viewComponentName}"</pre>
                <pre>Component file: <a href={`phpstorm://open?url=file://${this.state.devComponentFile}&line=1`}>{this.state.devComponentFile}</a></pre>
                <Copyable>
                    <pre style={{backgroundColor: 'white', padding: 10, border: 'solid 1px grey', fontSize: 11}}>{exampleComponent}</pre>
                </Copyable>
            </div>}
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

