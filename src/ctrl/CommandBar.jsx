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
var CommandBar = /** @class */ (function (_super) {
    __extends(CommandBar, _super);
    function CommandBar(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            searchedText: ''
        };
        return _this;
    }
    CommandBar.prototype.handleSearchKeyDown = function (event) {
        if (event.keyCode == 13) {
            if (this.props.onSearch) {
                this.props.onSearch(event.target.value);
            }
        }
        this.setState({ searchedText: event.target.value });
    };
    CommandBar.prototype.render = function () {
        return <div className="w-command-bar">
            {this.props.isSearchBoxVisible && <div className="search-box">
                <i className="ms-Icon ms-Icon--Search "></i>
                <input type="text" onKeyDown={this.handleSearchKeyDown.bind(this)} placeholder="Szukaj..." className="ms-font-m" autoFocus/>
            </div>}
            <div className="menu-bar">
                <div className="buttons-left">
                    {this.props.items.map(function (item, index) {
            if (item !== null) {
                return <a key={item.key} onClick={item.onClick} className="ms-font-m">
                                <i className={"ms-Icon ms-Icon--" + item.icon}></i> {item.label}
                            </a>;
            }
            return null;
        })}

                </div>
                <div className="buttons-right">
                    {this.props.rightItems.map(function (item, index) {
            if (item !== null) {
                return <a key={item.key} onClick={item.onClick} className="ms-font-m">
                                <i className={"ms-Icon ms-Icon--" + item.icon}></i> {item.label}
                            </a>;
            }
            return null;
        })}
                </div>
            </div>


        </div>;
    };
    CommandBar.defaultProps = {
        isSearchBoxVisible: false,
        searchPlaceholderText: 'Szukaj',
        items: [],
        rightItems: []
    };
    return CommandBar;
}(React.Component));
exports.CommandBar = CommandBar;
