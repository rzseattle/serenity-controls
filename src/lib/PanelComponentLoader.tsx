import NotificationSystem from "react-notification-system";
import * as React from "react";
import {Copyable} from "frontend/src/ctrl/Copyable";


declare var PRODUCTION: boolean;
declare var window: any;




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
    _isSub: boolean;
}

interface IProps {
    context: any;
    isSub: boolean;
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
        this.props.context.changeView(null, input, () => {
            this.props.onLoadEnd();
            if (callback) {
                callback();
            }
        });
    }


    handleGoTo(path, input = {}, callback = null) {
        this.props.context.changeView(path, input, callback);
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
        let ComponentInfo: any = p.context.view;

        let DebugTool = this.DebugTool;
        let debugVar = {
            log: s.log,
            propsReloadHandler: this.handleReloadProps.bind(this),
            componentInfo: ComponentInfo,
            props: p.context.viewData,
            store: p.context
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
            {this.props.context.viewServerErrors != null && <div style={{margin: 10, padding: 10, backgroundColor: "white"}}>
                <pre>{this.props.context.viewServerErrors.url}</pre>
                <pre style={{maxHeight: 200, overflow: "auto"}}>{JSON.stringify(this.props.context.viewServerErrors.input,null,2)}</pre>
                <div style={{padding: 10, backgroundColor: 'white', margin: 15}} dangerouslySetInnerHTML={{__html: this.props.context.viewServerErrors.response}}/>
            </div>}

            {/*<pre>
            {JSON.stringify(ComponentInfo, null, 2)}
                <hr/>
            {JSON.stringify(this.props.context, null, 2)}
            </pre>*/}


            {ComponentInfo ? <ComponentInfo.Component
                {...p.context.viewData}
                reloadProps={this.handleReloadProps.bind(this)}
                baseURL={p.context.view.baseURL}
                _baseURL={p.context.view.baseURL}
                _basePath={p.context.basePath}
                _notification={this.handleNotifycation.bind(this)}
                _log={this.handleLog.bind(this)}
                _reloadProps={this.handleReloadProps.bind(this)}
                _setPanelOption={this.props.setPanelOption}
                _goto={this.handleGoTo.bind(this)}
                _resolveComponent={this.handleReloadProps.bind(this)}
                _startLoadingIndicator={this.props.onLoadStart}
                _stopLoadingIndicator={this.props.onLoadEnd}
                _isSub={this.props.isSub}
                _scrollTo={(el) => {

                }}
            /> : !this.props.context.isViewLoading && <div style={{padding: 20}}>
                <h1>404 not found</h1>
                <div>Selected resource cannot be found</div>

            </div>}

            {(ComponentInfo == false && p.context.viewComponentName != null) && <div style={{padding: 10}}>
                <h3>Can't find component </h3>
                <pre>Route: "{p.context.viewComponentName}"</pre>
                <pre>Component file: <a href={`phpstorm://open?url=file://${this.state.devComponentFile}&line=1`}>{this.state.devComponentFile}</a></pre>
                <Copyable>
                    <pre style={{backgroundColor: 'white', padding: 10, border: 'solid 1px grey', fontSize: 11}}></pre>
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

