"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Notifications = require("react-notification-system");
var Comm_1 = require("./Comm");
var PanelComponentLoader = /** @class */ (function (_super) {
    __extends(PanelComponentLoader, _super);
    function PanelComponentLoader(props) {
        var _this = _super.call(this, props) || this;
        _this.DebugTool = null;
        _this.state = {
            loading: false,
            loadedProps: false,
            currComponent: global.ReactHelper.getWithData(props.component),
            log: [],
            debugToolLoaded: false
        };
        return _this;
    }
    PanelComponentLoader.prototype.componentDidMount = function () {
        var _this = this;
        if (!PRODUCTION) {
            //import {DebugTool} from '../utils/DebugTool'
            Promise.resolve().then(function () { return require(/* webpackChunkName = "DebugTool" */ '../utils/DebugTool'); }).then(function (_a) {
                var DebugTool = _a.DebugTool;
                _this.DebugTool = DebugTool;
                _this.setState({ debugToolLoaded: true });
            });
        }
    };
    PanelComponentLoader.prototype.handleReloadProps = function (input, callback) {
        var _this = this;
        if (input === void 0) { input = {}; }
        this.setState({ loading: true });
        Comm_1.default._post(this.props.requestURI, __assign({}, input, { __PROPS_REQUEST__: 1 })).then(function (data) {
            _this.setState({ loading: false, loadedProps: data });
            if (callback) {
                callback();
            }
        });
    };
    PanelComponentLoader.prototype.handleResolveComponent = function (path) {
        alert('Resolving component ' + path);
    };
    PanelComponentLoader.prototype.handleGoTo = function (path, input) {
        var _this = this;
        if (input === void 0) { input = {}; }
        this.setState({ loading: true });
        Comm_1.default._post(path, __assign({}, input, { __PROPS_REQUEST__: 1 })).then(function (data) {
            var stateObj = {};
            input = __assign({ _rch: 1 }, input);
            var urlParameters = Object.keys(input).map(function (i) { return i + '=' + input[i]; }).join('&');
            //history.pushState(stateObj, '', path + (urlParameters ? '?' : '') + urlParameters);
            window.location.hash = path + (urlParameters ? '?' : '') + urlParameters;
            _this.setState({ loading: false, loadedProps: data, currComponent: global.ReactHelper.get(data.component) });
        });
    };
    PanelComponentLoader.prototype.handleNotifycation = function (message, title, options) {
        if (title === void 0) { title = ''; }
        if (options === void 0) { options = {}; }
        var data = __assign({ title: title, message: message }, __assign({ level: 'success' }, options));
        this._notificationSystem.addNotification(data);
    };
    PanelComponentLoader.prototype.handleLog = function (message) {
        this.state.log.push({ msg: message });
        this.setState(null);
    };
    PanelComponentLoader.prototype.render = function () {
        var _this = this;
        var s = this.state;
        var p = s.loadedProps || __assign({}, this.props);
        if (!s.currComponent) {
            return <div style={{ padding: 10 }}>
                <h3>Can't find component</h3>
                <pre>{p.component}</pre>
            </div>;
        }
        var Component = s.currComponent._obj;
        var debugVar = {
            log: s.log,
            propsReloadHandler: this.handleReloadProps.bind(this),
            componentData: s.currComponent.data,
            props: p
        };
        var notificaton = {
            ref: function (ns) { return _this._notificationSystem = ns; }
        };
        var DebugTool = this.DebugTool;
        return <div>
            {!PRODUCTION && this.state.debugToolLoaded && <DebugTool {...debugVar}/>}
            {this.state.loading && <div className="w-loader" style={{ position: 'absolute', right: 10, top: 15 }}>
                <span><i></i><i></i><i></i><i></i></span>
            </div>}


            <Notifications {...notificaton}/>

            <Component {...p} reloadProps={this.handleReloadProps.bind(this)} _notification={this.handleNotifycation.bind(this)} _log={this.handleLog.bind(this)} _reloadProps={this.handleReloadProps.bind(this)} _goto={this.handleGoTo.bind(this)} _resolveComponent={this.handleReloadProps.bind(this)}/>

        </div>;
    };
    return PanelComponentLoader;
}(React.Component));
exports.default = PanelComponentLoader;
