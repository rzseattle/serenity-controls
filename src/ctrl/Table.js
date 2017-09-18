import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {filtersMapping, withFilterOpenLayer} from './Filters'


import {ColumnHelper} from './table/ColumnHelper'
import FiltersPresenter from './table/FiltersPresenter'
import Tbody from './table/Tbody'
import Footer from './table/Footer'
import {Loading, Error, EmptyResult} from './table/placeholders'


class Table extends Component {


    static propTypes = {
        data: PropTypes.array,
        remoteURL: PropTypes.string,
        selectable: PropTypes.bool,
        onSelectionChange: PropTypes.func,
        controlKey: PropTypes.string,
        onPage: PropTypes.number,
        selectable: PropTypes.bool,
        rememberState: PropTypes.bool,
        rowClassTemplate: PropTypes.func,
        rowStyleTemplate: PropTypes.func,
        columns: PropTypes.array,
        onPage: PropTypes.number,
        showFooter: PropTypes.bool,
        dataProvider: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
        additionalConditions: PropTypes.object

    }


    static defaultProps = {
        onPage: 25,
        columns: [],
        buttons: [],
        showFooter: true,
        rememberState: false,
        additionalConditions: {}
    }

    constructor(props) {

        super(props);


        let columns = props.columns || [];
        for (let i in columns) {
            columns[i] = this.returnColumnData(columns[i]);
        }

        //console.log(columns);


        this.state = {
            loading: false,
            firstLoaded: false,
            data: [],
            dataSourceError: false,
            dataSourceDebug: false,
            filters: {},
            order: {},
            onPage: this.props.onPage,
            currentPage: 1,
            countAll: 0,
            fixedLayout: false, // props.fixedLayout,
            columns: columns,
            bodyHeight: this.props.initHeight,
            allChecked: false,
            selection: []
        };

        //helpers
        this.tmpDragStartY = 0;
        this.xhrConnection = 0;

        if (window.controls === undefined)
            window.controls = {};
        window.controls[this.props.id] = () => this;


        let hashCode = function (s) {
            return s.split('').reduce(function (a, b) {
                a = ((a << 5) - a) + b.charCodeAt(0);
                return a & a
            }, 0);
        }
        this.hashCode = hashCode(this.props.controlKey + (window.CONTROLS_BASE_LOCATION != undefined ? window.CONTROLS_BASE_LOCATION : window.location.href));
    }


    componentWillMount() {

        if (this.props.rememberState && window.localStorage[this.hashCode]) {
            this.state = {...this.state, ...JSON.parse(window.localStorage[this.hashCode])};
            this.state.firstLoaded = false;
        }
    }

    getData() {
        return this.state.data;
    }


    componentDidUpdate(prevProps) {
        let state = this.state;
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
    }

    componentDidMount() {
        this.load();
    }

    componentWillReceiveProps(nextProps) {
        let columns = nextProps.columns || [];
        for (let i in columns) {
            columns[i] = this.returnColumnData(columns[i]);
        }
        this.setState({columns, columns});
    }

    getRequestData() {
        let trimmedData = [...this.state.columns];

        for (let i = 0; i < trimmedData.length; i++) {
            trimmedData[i] = {...trimmedData[i]};
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
        }
    }

    load() {

        this.state.dataSourceError = false;

        this.setState({loading: true});

        let setStateAfterLoad = (input) => {
            this.setState({
                data: input.data.slice(0),
                countAll: 0 + parseInt(input.countAll),
                loading: false,
                dataSourceDebug: input.debug ? input.debug : false,
                firstLoaded: true,
                selection: [],
                allChecked: false
            });
        }

        if (this.props.remoteURL) {
            if (this.xhrConnection) {
                this.xhrConnection.abort();
            }

            let xhr = new XMLHttpRequest();
            xhr.onload = (e) => {
                let parsed;
                if (xhr.status === 200) {
                    //parsed = {data: [], countAll: 0};
                    try {
                        let parsed = JSON.parse(xhr.responseText)
                        setStateAfterLoad(parsed);
                    } catch (e) {
                        this.setState({dataSourceError: xhr.responseText, loading: false})
                    }
                }
            }
            xhr.open('PUT', this.props.remoteURL + '?' + new Date().getTime(), true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify(this.getRequestData()));
            this.xhrConnection = xhr;

        } else if (this.props.dataProvider) {
            let result = this.props.dataProvider(this.getRequestData());

            if (result instanceof Promise) {
                result.then((data) => {
                    setStateAfterLoad(data);
                })
            } else {
                setStateAfterLoad(data);
            }
        }
    }

    handleStateRemove() {
        delete  window.localStorage[this.hashCode];
        if (confirm('Wyczyszczono dane tabelki, czy chcesz odświeżyć stronę?')) {
            window.location.reload();
        }
    }

    handleFilterChanged(field, value, condition, caption, labelCaptionSeparator, label) {
        this.state.filters[field] = {
            field: field,
            value: value,
            condition: condition,
            'caption': caption,
            labelCaptionSeparator: labelCaptionSeparator,
            label: label
        };
        this.setState({currentPage: 1, filters: this.state.filters}, this.load);
    }

    handleFilterDelete(key) {
        delete this.state.filters[key];
        this.setState({currentPage: 1, filters: this.state.filters}, this.load);
    }

    handleOrderDelete(field) {
        delete this.state.order[field]
        this.setState({}, this.load);
    }

    headClicked(index, e) {
        if (e.target.tagName != 'TH') {
            return;
        }

        let column = this.state.columns.filter(c => c !== null && c.display === true)[index];

        if (!column.orderField)
            return;

        let field = {};

        const _field = column.field;


        if (this.state.order[_field]) {
            field = this.state.order[_field];
        } else {
            field = {
                caption: column.caption,
                field: column.orderField,
                dir: 'desc'
            }
        }

        field = {...field, dir: field.dir == 'asc' ? 'desc' : 'asc'};

        this.state.order[_field] = field;

        this.setState({order: this.state.order}, this.load);

    }

    handleOnPageChangepage(onPage) {
        this.setState({onPage: onPage, currentPage: 1}, this.load);
    }

    handleCurrentPageChange(page) {
        let newPage = Math.max(1, Math.min(Math.ceil(this.state.countAll / this.state.onPage), page));
        if (newPage != this.state.currentPage) {
            this.setState({currentPage: newPage, selection: [], allChecked: false}, this.load);
        }
    }

    toggleFixedLayout() {
        this.setState({
            fixedLayout: !this.state.fixedLayout
        });
    }

    handleBodyResizeStart(e) {
        this.tmpDragStartY = e.clientY
        this.tmpCurrHeight = this.state.bodyHeight;
    }

    handleBodyResize(e) {
        if (e.clientY) {
            //this.setState({bodyHeight:  this.tmpCurrHeight + (-this.tmpDragStartY + e.clientY)});
        }
    }

    handleBodyResizeEnd(e) {
        this.setState({bodyHeight: this.tmpCurrHeight + (-this.tmpDragStartY + e.clientY)});
    }


    handleKeyDown(e) {
        //right
        if (e.keyCode == 39) {
            this.handleCurrentPageChange(this.state.currentPage + 1);
        }

        //left
        if (e.keyCode == 37) {
            this.handleCurrentPageChange(this.state.currentPage - 1);

        }
    }

    handleCheckClicked(index) {
        let s = this.state.selection;
        if (index == 'all') {

            if (!this.state.allChecked) {
                this.state.data.forEach((el, index) => {
                    if (s.indexOf(index) == -1) {
                        s.push(index);
                    }
                });
            } else {
                s = [];
            }
            this.setState({allChecked: !this.state.allChecked});
        } else {

            let selected = s.indexOf(index);
            if (selected == -1)
                s.push(index);
            else
                s.splice(selected, 1);

            if (s.length == this.state.data.length) {
                this.state.allChecked = true;
            } else {
                this.state.allChecked = false;
            }

        }

        if (this.props.onSelectionChange) {
            let tmp = [];
            s.forEach(index => tmp.push(this.state.data[index]));
            this.props.onSelectionChange(tmp, this);
        }

        this.setState({selection: s});

    }

    returnColumnData(inData) {
        if (inData === null) {
            return null;
        }

        if (inData instanceof ColumnHelper) {
            inData = inData.get();
        }

        let data = {
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
            'classTemplate': () => [],
            'styleTemplate': () => [],
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
        }
        data.filter = inData.field ? data.filter : null;
        data = {...data, ...inData};


        data.orderField = data.orderField || data.field;


        if (Array.isArray(data.filter)) {
            if (data.filter.length > 0) {
                data.filter = {
                    'type': 'MultiFilter',
                    'field': 'id',
                    'title': 'Id',
                    'caption': 'Id',
                    filters: data.filter
                }
            } else {
                data.filter = null;
            }
        } else if (data.filter != null) {
            data.filter.field = data.filter.field || inData.field;
        }


        return data;
    }

    render() {

        const columns = this.state.columns;

        return (
            <div className={'w-table ' + (this.state.loading ? 'w-table-loading' : '')} ref="container" tabIndex={0} onKeyDown={this.handleKeyDown.bind(this)}>
                <div className="w-table-loader">
                    <span><i></i><i></i><i></i><i></i></span>
                </div>
                <div className="w-table-top">
                    <FiltersPresenter order={this.state.order} filters={this.state.filters}
                                      FilterDelete={this.handleFilterDelete.bind(this)}
                                      orderDelete={this.handleOrderDelete.bind(this)}
                    />
                </div>

                <table className={this.state.fixedLayout ? 'w-table-fixed' : ''}>
                    <thead>
                    <tr>
                        {this.props.selectable ?
                            <th className="w-table-selection-header" onClick={this.handleCheckClicked.bind(this, 'all')}>
                                <input type="checkbox" checked={this.state.allChecked}/>
                            </th>
                            : null
                        }
                        {columns.filter(el => el !== null && el.display === true).map((el, index) => {
                            const Component = el.filter ? withFilterOpenLayer(filtersMapping[el.filter.type]) : null;
                            let classes = []
                            if (this.state.order[el.field] !== undefined) {
                                classes.push('w-table-sorted w-table-sorted-' + this.state.order[el.field].dir)
                            }
                            if (this.state.filters[el.field] !== undefined) {
                                classes.push('w-table-filtered')
                            }
                            return (
                                <th key={index} onClick={this.headClicked.bind(this, index)}
                                    style={{width: el.width}}
                                    className={classes.join(' ')}
                                >
                                    {el.order ? <i className={'fa fa-' + (el.order == 'asc' ? 'arrow-down' : 'arrow-up')}></i> : ''}
                                    {el.caption}
                                    {el.filter ? <Component onChange={this.handleFilterChanged.bind(this)} {...el.filter} caption={el.caption}/> : ''}
                                </th>)
                        })}
                    </tr>
                    </thead>


                    {this.state.dataSourceError && <Error colspan={columns.length + 1} error={this.state.dataSourceError}/>}
                    {!this.state.loading && this.state.data.length + 1 == 0 && <EmptyResult colspan={columns.length + 1}/>}
                    {this.state.loading && !this.state.firstLoaded && <Loading colspan={columns.length + 1}/>}
                    {this.state.firstLoaded && this.state.data.length > 0 && <Tbody
                        rowClassTemplate={this.props.rowClassTemplate}
                        rowStyleTemplate={this.props.rowStyleTemplate}
                        selection={this.state.selection}
                        onCheck={this.handleCheckClicked.bind(this)}
                        selectable={this.props.selectable}
                        columns={columns} filters={this.state.filters}
                        order={this.state.order} loading={this.state.loading}
                        bodyHeight={this.state.fixedLayout ? this.state.bodyHeight : 'auto'}
                        data={this.state.data}
                    />}

                    {this.props.showFooter && <tfoot>
                    {this.state.firstLoaded && this.state.data.length > 0 &&
                    <Footer
                        columns={columns}
                        count={this.state.countAll}
                        onPage={this.state.onPage}
                        onPageChanged={this.handleOnPageChangepage.bind(this)}
                        currentPage={this.state.currentPage}
                        currentPageChanged={this.handleCurrentPageChange.bind(this)}
                        bodyResizeStart={this.handleBodyResizeStart.bind(this)}
                        bodyResize={this.handleBodyResize.bind(this)}
                        bodyResizeEnd={this.handleBodyResizeEnd.bind(this)}
                        parent={this}
                    />}
                    </tfoot>}
                </table>

                {this.state.dataSourceDebug ? <pre>{this.state.dataSourceDebug}</pre> : null}
            </div>
        )
    }

}


export {Table, ColumnHelper, ColumnHelper as Column}
