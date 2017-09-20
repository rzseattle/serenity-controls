"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Container = function (props) {
    return (<div className="container">{props.children}</div>);
};
exports.Container = Container;
var Row = function (props) {
    var children = Array.isArray(props.children) ? props.children : [props.children];
    children = children.filter(function (el) { return el != null && el; });
    var colMd = 0;
    var colsMd = [];
    //if detailed width delivered
    if (props.md) {
        var sum = props.md.reduce(function (a, b) { return a + b; }, 0);
        if (sum > 12) {
            throw new Error("To many columns " + sum);
        }
        //calculating width for rest of columns
        colMd = (12 - sum) / (children.length - props.md.length);
        colsMd = Object.assign({}, props.md);
    }
    else {
        //equal width for each element
        colMd = 12 / children.length;
    }
    //adding calculated default row width
    for (var i = colsMd.length; i < 12; i++) {
        colsMd[i] = Math.floor(colMd);
    }
    var style = {};
    if (props.noGutters) {
        style.padding = 0;
        style.margin = 0;
    }
    return (<div className="row">
            {children.map(function (child, key) {
        return <div key={key} style={style} className={'col-md-' + colsMd[key]}>{child}</div>;
    })}
        </div>);
};
exports.Row = Row;
Row.defaultProps = {
    noGutters: true
};
