"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
exports.default = function (props) {
    var children = Array.isArray(props.children) ? props.children : [props.children];
    return (<div className="w-navbar">
            <ol>
                {children.map(function (child, key) {
        if (child !== null) {
            return <li key={key} className={'ms-font-m ' + (key + 1 == props.children.length ? 'active' : '')}>
                            {child}
                            <i className="ms-Icon ms-Icon--ChevronRight" aria-hidden="true"/>
                        </li>;
        }
        return null;
    })}
            </ol>

            <div style={{ float: 'right' }}>
                <div style={{ display: 'table-cell', height: '50px', verticalAlign: 'middle' }}>
                    {props.toolbar}
                </div>
            </div>
        </div>);
};
