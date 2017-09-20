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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Tabs = /** @class */ (function (_super) {
    __extends(Tabs, _super);
    function Tabs(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            currentTab: props.defaultActiveTab || 0
        };
        return _this;
    }
    Tabs.prototype.handleTabChange = function (index, e) {
        if (this.props.onTabChange) {
            this.props.onTabChange(index, e);
        }
        this.setState({ currentTab: index });
    };
    Tabs.prototype.render = function () {
        var _this = this;
        var p = this.props;
        var s = this.state;
        return (<div className="w-tabs">
                <div className="tabs-links">
                    {React.Children.map(p.children, function (child, index) {
            return <div key={index} className={(index == s.currentTab ? 'active' : '') + ' ' + (child.props.badge ? 'with-badge' : '')} onClick={_this.handleTabChange.bind(_this, index)}>
                            {child.props.icon ?
                <i className={'fa fa-' + child.props.icon}></i>
                : null}
                            {child.props.title}
                            {child.props.badge != undefined ? <div className="w-tabs-badge">({child.props.badge})</div> : null}

                        </div>;
        })}
                </div>
                <div className="tabs-links-separator"></div>
                <div className="tab-pane-container">
                    {p.children[s.currentTab]}
                </div>
            </div>);
    };
    return Tabs;
}(React.Component));
exports.Tabs = Tabs;
var TabPane = function (props) {
    return (<div className="tab-pane">
            {props.children}
        </div>);
};
exports.TabPane = TabPane;
