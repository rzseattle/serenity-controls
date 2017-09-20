"use strict";
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
var ColumnHelper = /** @class */ (function () {
    function ColumnHelper(initData) {
        this.data = __assign({ events: {
                'click': [],
                'enter': [],
                'leave': [],
                'mouseUp': [],
            }, filter: {} }, initData);
    }
    ColumnHelper.id = function (field, caption) {
        return new ColumnHelper({
            field: field,
            caption: caption,
            filter: {
                type: 'NumericFilter',
            }
        }).className('right');
    };
    ColumnHelper.number = function (field, caption) {
        return new ColumnHelper({
            field: field,
            caption: caption,
            filter: {
                type: 'NumericFilter',
            }
        }).className('right');
    };
    ColumnHelper.map = function (field, caption, options, multiSelectFilter) {
        if (multiSelectFilter === void 0) { multiSelectFilter = false; }
        return new ColumnHelper({
            field: field,
            caption: caption,
            template: function (value) { return options[value]; },
            filter: {
                type: 'SelectFilter',
                content: options,
                multiselect: multiSelectFilter
            }
        });
    };
    ColumnHelper.text = function (field, caption) {
        return new ColumnHelper({
            field: field,
            caption: caption,
            filter: {
                type: 'TextFilter',
            }
        });
    };
    ColumnHelper.link = function (field, caption, urlResolver) {
        return ColumnHelper.text('id', '')
            .onMouseUp(function (row, column, e) {
            var url = urlResolver(row, column, event);
            if (e.button == 1) {
                window.open(url);
            }
            else {
                window.location.href = url;
            }
        });
    };
    ColumnHelper.money = function (field, caption) {
        return new ColumnHelper({
            field: field,
            caption: caption,
            template: function (val, row) { return parseFloat(val).toFixed(2); },
            filter: {
                type: 'NumericFilter',
            }
        }).className('right');
    };
    ColumnHelper.email = function (field, caption) {
        return new ColumnHelper({
            field: field,
            caption: caption,
            template: function (val, row) { return <a href={'mailto:' + val}>{val}</a>; },
            filter: {
                type: 'TextFilter',
            }
        });
    };
    ColumnHelper.date = function (field, caption) {
        return new ColumnHelper({
            field: field,
            caption: caption,
            icon: 'fa-calendar',
            filter: {
                type: 'DateFilter',
            }
        });
    };
    ColumnHelper.bool = function (field, caption) {
        return new ColumnHelper({
            field: field,
            caption: caption,
            classTemplate: function (row, column) { return ['center', (row[column.field] == '1' ? 'darkgreen' : 'darkred')]; },
            template: function (value) { return <i className={'fa fa-' + (value == 1 ? 'check' : 'times')}></i>; },
            filter: {
                type: 'SwitchFilter',
                content: { 0: 'Nie', 1: 'Tak' },
            }
        });
    };
    ColumnHelper.hidden = function (field) {
        return new ColumnHelper({
            field: field,
            display: false
        });
    };
    ColumnHelper.template = function (caption, template) {
        return new ColumnHelper({
            template: template
        }).noFilter();
    };
    ColumnHelper.custom = function (data) {
        return new ColumnHelper(data);
    };
    ColumnHelper.prototype.className = function (className) {
        this.data.class = className;
        return this;
    };
    ColumnHelper.prototype.template = function (fn) {
        this.data.template = fn;
        return this;
    };
    ColumnHelper.prototype.append = function (x) {
        this.data.append = x;
        return this;
    };
    ColumnHelper.prototype.prepend = function (x) {
        this.data.prepend = x;
        return this;
    };
    ColumnHelper.prototype.width = function (x) {
        this.data.width = x;
        return this;
    };
    ColumnHelper.prototype.noFilter = function () {
        this.data.filter = null;
        return this;
    };
    /*filter(type, field, conf) {
        if(Array.isArray(this.data.filter)){

        }else{

        }
    }*/
    ColumnHelper.prototype.onClick = function (fn) {
        this.data.events.click.push(fn);
        return this;
    };
    ColumnHelper.prototype.onMouseUp = function (fn) {
        this.data.events.mouseUp.push(fn);
        return this;
    };
    ColumnHelper.prototype.onEnter = function (fn) {
        this.data.events.enter.push(fn);
        return this;
    };
    ColumnHelper.prototype.onLeave = function (fn) {
        this.data.events.leave.push(fn);
        return this;
    };
    ColumnHelper.prototype.set = function (el) {
        this.data = __assign({}, this.data, el);
        return this;
    };
    ColumnHelper.prototype.get = function () {
        return this.data;
    };
    return ColumnHelper;
}());
exports.ColumnHelper = ColumnHelper;
