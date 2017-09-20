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
var Filters_1 = require("./Filters");
var ColumnHelper_1 = require("./table/ColumnHelper");
exports.ColumnHelper = ColumnHelper_1.ColumnHelper;
exports.Column = ColumnHelper_1.ColumnHelper;
var FiltersPresenter_1 = require("./table/FiltersPresenter");
var Tbody_1 = require("./table/Tbody");
var Footer_1 = require("./table/Footer");
var placeholders_1 = require("./table/placeholders");
var Table = /** @class */ (function (_super) {
    __extends(Table, _super);
    function Table(props) {
        var _this = _super.call(this, props) || this;
        _this.defaultProps = {
            onPage: 25,
            columns: [],
            showFooter: true,
            rememberState: false,
            additionalConditions: {}
        };
        var columns = props.columns || [];
        for (var i in columns) {
            columns[i] = _this.prepareColumnData(columns[i]);
        }
        //console.log(columns);
        _this.state = {
            loading: false,
            firstLoaded: false,
            data: [],
            dataSourceError: false,
            dataSourceDebug: false,
            filters: {},
            order: {},
            onPage: _this.props.onPage,
            currentPage: 1,
            countAll: 0,
            fixedLayout: false,
            columns: columns,
            bodyHeight: _this.props.initHeight,
            allChecked: false,
            selection: []
        };
        //helpers
        _this.tmpDragStartY = 0;
        _this.xhrConnection = 0;
        if (window.controls === undefined)
            window.controls = {};
        window.controls[_this.props.id] = function () { return _this; };
        var hashCode = function (s) {
            return s.split('').reduce(function (a, b) {
                a = ((a << 5) - a) + b.charCodeAt(0);
                return a & a;
            }, 0);
        };
        _this.hashCode = hashCode(_this.props.controlKey + (window.CONTROLS_BASE_LOCATION != undefined ? window.CONTROLS_BASE_LOCATION : window.location.href));
        return _this;
    }
    Table.prototype.componentWillMount = function () {
        if (this.props.rememberState && window.localStorage[this.hashCode]) {
            this.state = __assign({}, this.state, JSON.parse(window.localStorage[this.hashCode]));
            this.state.firstLoaded = false;
        }
    };
    Table.prototype.getData = function () {
        return this.state.data;
    };
    Table.prototype.componentDidUpdate = function (prevProps) {
        var state = this.state;
        if (this.props.rememberState) {
            window.localStorage[this.hashCode] = JSON.stringify({
                onPage: state.onPage,
                currentPage: state.currentPage,
                bodyHeight: state.bodyHeight,
                filters: state.filters,
                order: state.order,
                fixedLayout: state.fixedLayout
            });
        }
        if (prevProps.remoteURL != this.props.remoteURL) {
            this.load();
        }
    };
    Table.prototype.componentDidMount = function () {
        this.load();
    };
    Table.prototype.componentWillReceiveProps = function (nextProps) {
        var columns = nextProps.columns || [];
        for (var i in columns) {
            columns[i] = this.prepareColumnData(columns[i]);
        }
        this.setState({ columns: columns, columns: columns });
    };
    Table.prototype.getRequestData = function () {
        var trimmedData = this.state.columns.slice();
        for (var i = 0; i < trimmedData.length; i++) {
            trimmedData[i] = __assign({}, trimmedData[i]);
            trimmedData[i].filter = {};
            trimmedData[i].events = {};
        }
        return {
            //need to deep clone and events remove
            columns: JSON.parse(JSON.stringify(trimmedData)),
            filters: this.state.filters,
            order: this.state.order,
            onPage: this.state.onPage,
            currentPage: this.state.currentPage,
            additionalConditions: this.props.additionalConditions
        };
    };
    Table.prototype.load = function () {
        var _this = this;
        this.state.dataSourceError = false;
        this.setState({ loading: true });
        var setStateAfterLoad = function (input) {
            _this.setState({
                data: input.data.slice(0),
                countAll: 0 + parseInt(input.countAll),
                loading: false,
                dataSourceDebug: input.debug ? input.debug : false,
                firstLoaded: true,
                selection: [],
                allChecked: false
            });
        };
        if (this.props.remoteURL) {
            if (this.xhrConnection) {
                this.xhrConnection.abort();
            }
            var xhr_1 = new XMLHttpRequest();
            xhr_1.onload = function (e) {
                var parsed;
                if (xhr_1.status === 200) {
                    //parsed = {data: [], countAll: 0};
                    try {
                        var parsed_1 = JSON.parse(xhr_1.responseText);
                        setStateAfterLoad(parsed_1);
                    }
                    catch (e) {
                        _this.setState({ dataSourceError: xhr_1.responseText, loading: false });
                    }
                }
            };
            xhr_1.open('PUT', this.props.remoteURL + '?' + new Date().getTime(), true);
            xhr_1.setRequestHeader('Content-Type', 'application/json');
            xhr_1.send(JSON.stringify(this.getRequestData()));
            this.xhrConnection = xhr_1;
        }
        else if (this.props.dataProvider) {
            var result = this.props.dataProvider(this.getRequestData());
            if (result instanceof Promise) {
                result.then(function (data) {
                    setStateAfterLoad(data);
                });
            }
            else {
                setStateAfterLoad(data);
            }
        }
    };
    Table.prototype.handleStateRemove = function () {
        delete window.localStorage[this.hashCode];
        if (confirm('Wyczyszczono dane tabelki, czy chcesz odświeżyć stronę?')) {
            window.location.reload();
        }
    };
    Table.prototype.handleFilterChanged = function (field, value, condition, caption, labelCaptionSeparator, label) {
        this.state.filters[field] = {
            field: field,
            value: value,
            condition: condition,
            'caption': caption,
            labelCaptionSeparator: labelCaptionSeparator,
            label: label
        };
        this.setState({ currentPage: 1, filters: this.state.filters }, this.load);
    };
    Table.prototype.handleFilterDelete = function (key) {
        delete this.state.filters[key];
        this.setState({ currentPage: 1, filters: this.state.filters }, this.load);
    };
    Table.prototype.handleOrderDelete = function (field) {
        delete this.state.order[field];
        this.setState({}, this.load);
    };
    Table.prototype.headClicked = function (index, e) {
        if (e.target.tagName != 'TH') {
            return;
        }
        var column = this.state.columns.filter(function (c) { return c !== null && c.display === true; })[index];
        if (!column.orderField)
            return;
        var field = {};
        var _field = column.field;
        if (this.state.order[_field]) {
            field = this.state.order[_field];
        }
        else {
            field = {
                caption: column.caption,
                field: column.orderField,
                dir: 'desc'
            };
        }
        field = __assign({}, field, { dir: field.dir == 'asc' ? 'desc' : 'asc' });
        this.state.order[_field] = field;
        this.setState({ order: this.state.order }, this.load);
    };
    Table.prototype.handleOnPageChangepage = function (onPage) {
        this.setState({ onPage: onPage, currentPage: 1 }, this.load);
    };
    Table.prototype.handleCurrentPageChange = function (page) {
        var newPage = Math.max(1, Math.min(Math.ceil(this.state.countAll / this.state.onPage), page));
        if (newPage != this.state.currentPage) {
            this.setState({ currentPage: newPage, selection: [], allChecked: false }, this.load);
        }
    };
    Table.prototype.toggleFixedLayout = function () {
        this.setState({
            fixedLayout: !this.state.fixedLayout
        });
    };
    Table.prototype.handleBodyResizeStart = function (e) {
        this.tmpDragStartY = e.clientY;
        this.tmpCurrHeight = this.state.bodyHeight;
    };
    Table.prototype.handleBodyResize = function (e) {
        if (e.clientY) {
            //this.setState({bodyHeight:  this.tmpCurrHeight + (-this.tmpDragStartY + e.clientY)});
        }
    };
    Table.prototype.handleBodyResizeEnd = function (e) {
        this.setState({ bodyHeight: this.tmpCurrHeight + (-this.tmpDragStartY + e.clientY) });
    };
    Table.prototype.handleKeyDown = function (e) {
        //right
        if (e.keyCode == 39) {
            this.handleCurrentPageChange(this.state.currentPage + 1);
        }
        //left
        if (e.keyCode == 37) {
            this.handleCurrentPageChange(this.state.currentPage - 1);
        }
    };
    Table.prototype.handleCheckClicked = function (index) {
        var _this = this;
        var s = this.state.selection;
        if (index == 'all') {
            if (!this.state.allChecked) {
                this.state.data.forEach(function (el, index) {
                    if (s.indexOf(index) == -1) {
                        s.push(index);
                    }
                });
            }
            else {
                s = [];
            }
            this.setState({ allChecked: !this.state.allChecked });
        }
        else {
            var selected = s.indexOf(index);
            if (selected == -1)
                s.push(index);
            else
                s.splice(selected, 1);
            if (s.length == this.state.data.length) {
                this.state.allChecked = true;
            }
            else {
                this.state.allChecked = false;
            }
        }
        if (this.props.onSelectionChange) {
            var tmp_1 = [];
            s.forEach(function (index) { return tmp_1.push(_this.state.data[index]); });
            this.props.onSelectionChange(tmp_1, this);
        }
        this.setState({ selection: s });
    };
    Table.prototype.returnColumnData = function (inData) {
        if (inData === null) {
            return null;
        }
        if (inData instanceof ColumnHelper_1.ColumnHelper) {
            inData = inData.get();
        }
        var data = {
            'field': null,
            'caption': inData.caption == undefined ? inData.field : inData.caption,
            'isSortable': true,
            'display': true,
            'toolTip': null,
            'width': null,
            'class': [],
            'type': 'Simple',
            'orderField': null,
            'icon': null,
            'append': null,
            'prepend': null,
            'classTemplate': function () { return []; },
            'styleTemplate': function () { return []; },
            'template': null,
            'default': '',
            'events': {
                'click': [],
                'enter': [],
                'leave': []
            },
            'filter': {
                'type': 'TextFilter',
                'field': inData.field
            }
        };
        data.filter = inData.field ? data.filter : null;
        data = __assign({}, data, inData);
        data.orderField = data.orderField || data.field;
        if (Array.isArray(data.filter)) {
            if (data.filter.length > 0) {
                data.filter = {
                    'type': 'MultiFilter',
                    'field': 'id',
                    'title': 'Id',
                    'caption': 'Id',
                    filters: data.filter
                };
            }
            else {
                data.filter = null;
            }
        }
        else if (data.filter != null) {
            data.filter.field = data.filter.field || inData.field;
        }
        return data;
    };
    Table.prototype.render = function () {
        var _this = this;
        var columns = this.state.columns;
        return (<div className={'w-table ' + (this.state.loading ? 'w-table-loading' : '')} ref="container" tabIndex={0} onKeyDown={this.handleKeyDown.bind(this)}>
                <div className="w-table-loader">
                    <span><i></i><i></i><i></i><i></i></span>
                </div>
                <div className="w-table-top">
                    <FiltersPresenter_1.default order={this.state.order} filters={this.state.filters} FilterDelete={this.handleFilterDelete.bind(this)} orderDelete={this.handleOrderDelete.bind(this)}/>
                </div>

                <table className={this.state.fixedLayout ? 'w-table-fixed' : ''}>
                    <thead>
                    <tr>
                        {this.props.selectable ?
            <th className="w-table-selection-header" onClick={this.handleCheckClicked.bind(this, 'all')}>
                                <input type="checkbox" checked={this.state.allChecked}/>
                            </th>
            : null}
                        {columns.filter(function (el) { return el !== null && el.display === true; }).map(function (el, index) {
            var Component = el.filter ? Filters_1.withFilterOpenLayer(Filters_1.filtersMapping[el.filter.type]) : null;
            var classes = [];
            if (_this.state.order[el.field] !== undefined) {
                classes.push('w-table-sorted w-table-sorted-' + _this.state.order[el.field].dir);
            }
            if (_this.state.filters[el.field] !== undefined) {
                classes.push('w-table-filtered');
            }
            return (<th key={index} onClick={_this.headClicked.bind(_this, index)} style={{ width: el.width }} className={classes.join(' ')}>
                                    {el.order ? <i className={'fa fa-' + (el.order == 'asc' ? 'arrow-down' : 'arrow-up')}></i> : ''}
                                    {el.caption}
                                    {el.filter ? <Component onChange={_this.handleFilterChanged.bind(_this)} {...el.filter} caption={el.caption}/> : ''}
                                </th>);
        })}
                    </tr>
                    </thead>


                    {this.state.dataSourceError && <placeholders_1.Error colspan={columns.length + 1} error={this.state.dataSourceError}/>}
                    {!this.state.loading && this.state.data.length + 1 == 0 && <placeholders_1.EmptyResult colspan={columns.length + 1}/>}
                    {this.state.loading && !this.state.firstLoaded && <placeholders_1.Loading colspan={columns.length + 1}/>}
                    {this.state.firstLoaded && this.state.data.length > 0 && <Tbody_1.default rowClassTemplate={this.props.rowClassTemplate} rowStyleTemplate={this.props.rowStyleTemplate} selection={this.state.selection} onCheck={this.handleCheckClicked.bind(this)} selectable={this.props.selectable} columns={columns} filters={this.state.filters} order={this.state.order} loading={this.state.loading} bodyHeight={this.state.fixedLayout ? this.state.bodyHeight : 'auto'} data={this.state.data}/>}

                    {this.props.showFooter && <tfoot>
                    {this.state.firstLoaded && this.state.data.length > 0 &&
            <Footer_1.default columns={columns} count={this.state.countAll} onPage={this.state.onPage} onPageChanged={this.handleOnPageChangepage.bind(this)} currentPage={this.state.currentPage} currentPageChanged={this.handleCurrentPageChange.bind(this)} bodyResizeStart={this.handleBodyResizeStart.bind(this)} bodyResize={this.handleBodyResize.bind(this)} bodyResizeEnd={this.handleBodyResizeEnd.bind(this)} parent={this}/>}
                    </tfoot>}
                </table>

                {this.state.dataSourceDebug ? <pre>{this.state.dataSourceDebug}</pre> : null}
            </div>);
    };
    return Table;
}(React.Component));
exports.Table = Table;
