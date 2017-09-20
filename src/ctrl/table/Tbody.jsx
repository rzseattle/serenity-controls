"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
exports.default = function (props) {
    var packValue = function (val, column, row) {
        var templateResult = false;
        if (column.template) {
            templateResult = column.template(val, row);
        }
        return (<div>
                {column.icon ? <i className={'w-table-prepend-icon fa ' + column.icon}></i> : ''}
                {column.prepend ? column.prepend : ''}
                {templateResult ? (typeof templateResult == 'string' ? <span dangerouslySetInnerHTML={{ __html: (column.template(val, row)) }}></span> : templateResult) : (val ? val : column.default)}
                {column.append ? column.append : ''}
            </div>);
    };
    var columns = props.columns.filter(function (el) { return el !== null && el.display === true; });
    var cache = {};
    for (var index = 0; index < columns.length; index++) {
        var column = columns[index];
        cache[index] = cache[index] || {};
        cache[index].classes = [];
        if (props.order[column.field] !== undefined) {
            cache[index].classes.push('w-table-sorted w-table-sorted-' + props.order[column.field].dir);
        }
        if (props.filters[column.field] !== undefined) {
            cache[index].classes.push('w-table-filtered');
        }
        if (column.events.click && column.events.click.length > 0 ||
            column.events.mouseUp && column.events.mouseUp.length > 0) {
            cache[index].classes.push('w-table-cell-clickable');
        }
        cache[index].classes = cache[index].classes.concat(column.class);
    }
    return (<tbody style={{ maxHeight: props.bodyHeight }}>


        {props.data.map(function (row, index) {
        return <tr key={index} className={props.rowClassTemplate ? props.rowClassTemplate(row, index) : ''} style={props.rowStyleTemplate ? props.rowStyleTemplate(row, index) : {}}>
                {props.selectable ?
            <td className="w-table-selection-cell" onClick={function (e) { return props.onCheck(index, e); }}>
                        <input type="checkbox" checked={props.selection.indexOf(index) != -1}/>
                    </td>
            : null}
                {columns.map(function (column, index2) {
            return (<td key={'cell' + index2} style={__assign({ width: column.width }, column.styleTemplate(row, column))} onClick={column.events.click ? function (event) {
                column.events.click.map(function (callback) {
                    callback.bind(_this)(row, column, event);
                });
            } : function () {
            }} onMouseUp={column.events.mouseUp ? function (event) {
                column.events.mouseUp.map(function (callback) {
                    callback.bind(_this)(row, column, event);
                });
            } : function () {
            }} onMouseEnter={column.events.enter ? function (event) {
                column.events.enter.map(function (callback) {
                    callback.bind(_this)(row, column, event);
                });
            } : function () {
            }} onMouseLeave={column.events.leave ? function (event) {
                column.events.leave.map(function (callback) {
                    callback.bind(_this)(row, column, event);
                });
            } : function () {
            }} className={cache[index2].classes.concat(column.classTemplate(row, column)).join(' ')}>

                            {packValue(row[column.field] ? row[column.field] : column.default, column, row)}
                        </td>);
        })}
            </tr>;
    })}

        </tbody>);
};
