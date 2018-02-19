declare var window: any;
declare var PRODUCTION: any;
import * as React from "react";
import {TextFilter} from './Filters'
import {ColumnHelper} from './table/ColumnHelper'
import FiltersPresenter from './table/FiltersPresenter'
import Tbody from './table/Tbody'
import Footer from './table/Footer'
import {IColumnData, IFilterValue, IOrder} from './table/Interfaces'
import {EmptyResult, Error, Loading} from './table/placeholders'
import {Icon} from "./Icon";
import {Tooltip} from "./Overlays";
import {deepCopy, deepIsEqual} from "frontend/src/lib/JSONTools";
import Thead from "frontend/src/ctrl/table/Thead";
import Comm from "frontend/src/lib/Comm";


interface IDataQuery {

}

interface ITableDataInput {
    data: Array<any>,
    countAll?: number
    debug?: string,
    decorator?: { (requestData: IDataQuery, data: ITableDataInput): ITableDataInput | Promise<ITableDataInput> }
}

interface IDataProvider {
    (requestData: IDataQuery): ITableDataInput | Promise<ITableDataInput>;
}

interface ISelectionChangeEvent {
    (selected: Array<any>): any;
}

interface IRowClassTemplate {
    (row: any, index: number): string;
}

interface IRowStyleTemplate {
    (row: any, index: number): any;
}


interface ITableProps {
    /**
     * Spróbujemy komentarza może uda się coś wyświetlić
     */
    dataProvider?: IDataProvider;
    remoteURL?: string,
    selectable?: boolean,
    onSelectionChange?: ISelectionChangeEvent,
    controlKey?: string,
    onPage?: number,
    rememberState?: boolean,
    rowClassTemplate?: IRowClassTemplate,
    rowStyleTemplate?: IRowStyleTemplate,
    columns: Array<IColumnData> | Array<ColumnHelper>,
    showFooter?: boolean,
    showHeader?: boolean,
    additionalConditions?: any
    filters?: { [key: string]: IFilterValue };
    onFiltersChange?: (filtersValue: { [key: string]: IFilterValue }) => any;
    onDataChange?: (data: any) => any;
    data?: ITableDataInput


}


interface ITableState {
    loading: boolean,
    firstLoaded: boolean,
    data: Array<any>,
    dataSourceError: string,
    dataSourceDebug: boolean,
    filters: { [key: string]: IFilterValue }
    order: { [key: string]: IOrder }
    onPage: number,
    currentPage: number,
    countAll: number,
    fixedLayout: boolean, // props.fixedLayout,
    columns: IColumnData[],
    //bodyHeight: this.props.initHeight,
    allChecked: boolean,
    selection: Array<any>,
    tooltipData: any
}


class Table extends React.Component<ITableProps, ITableState> {

    public static defaultProps: Partial<ITableProps> = {
        onPage: 25,
        columns: [],
        showFooter: true,
        showHeader: true,
        rememberState: false,
        additionalConditions: {},
        filters: null,
        data: {data: [], countAll: 0, debug: ""}
    }
    private tmpDragStartY: number;
    private xhrConnection: XMLHttpRequest;
    private hashCode: string;
    public state: ITableState;
    private tooltipTimeout: number;

    constructor(props) {

        super(props);

        let columns: IColumnData[] = props.columns;
        for (let i in columns) {
            columns[i] = this.prepareColumnData(columns[i]);
        }

        //console.log(columns);


        this.state = {
            loading: false,
            firstLoaded: false,
            data: this.props.data.data,
            dataSourceError: "",
            dataSourceDebug: false,
            filters: deepCopy(this.props.filters),
            order: {},
            onPage: this.props.onPage,
            currentPage: 1,
            countAll: this.props.data.countAll,
            fixedLayout: false, // props.fixedLayout,
            columns: columns,
            //bodyHeight: this.props.initHeight,
            allChecked: false,
            selection: [],
            tooltipData: null
        };

        //helpers
        this.tmpDragStartY = 0;
        this.xhrConnection = null;


        let hashCode = function (s) {
            return s.split('').reduce(function (a, b) {
                a = ((a << 5) - a) + b.charCodeAt(0);
                return a & a
            }, 0);
        }
        this.hashCode = hashCode(this.props.controlKey + (window.CONTROLS_BASE_LOCATION != undefined ? window.CONTROLS_BASE_LOCATION : window.location.pathname + window.location.hash.split("?")[0]));

        this.tooltipTimeout = null;

    }


    componentWillMount() {


        if (this.props.rememberState && window.localStorage[this.hashCode]) {
            const local = JSON.parse(window.localStorage[this.hashCode]);
            let filters = deepCopy(this.state.filters);
            //for controlable filters u cant overwrite them when table is mounting
            filters = {...filters, ...local.filters};
            this.setState({...this.state, ...local, firstLoaded: false, filters}, () => {
                if (this.props.onFiltersChange) {
                    this.props.onFiltersChange(deepCopy(this.state.filters));
                }
            });


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
                //bodyHeight: state.bodyHeight,
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
        if (this.props.remoteURL || this.props.dataProvider) {
            this.load();
        }
    }

    /*shouldComponentUpdate(nextProps, nextState) {

        let should = false;

        if (!deepIsEqual(this.state.filters, nextState.filters)) {
            if (!PRODUCTION) {
                console.log("[Table] Filters diference")
            }
            return true;
        }
        if (!deepIsEqual(this.state.order, nextState.order)) {
            if (!PRODUCTION) {
                console.log("[Table] order diference")
            }
            return true;
        }
        if (!deepIsEqual(this.state.columns, nextState.columns)) {
            if (!PRODUCTION) {
                console.log("[Table] Columns diference")
            }
            return true;
        }
        let n = nextState;
        let p = this.state;
        if (!deepIsEqual(
                [
                    p.loading,
                    p.onPage,
                    p.currentPage,
                    p.allChecked,
                    p.selection,
                    p.dataSourceError,
                    p.dataSourceDebug
                ],
                [
                    n.loading,
                    n.onPage,
                    n.currentPage,
                    n.allChecked,
                    n.selection,
                    n.dataSourceError,
                    n.dataSourceDebug
                ]
            )) {
            if (!PRODUCTION) {
                console.log("[Table] Base state diference")
            }
            return true;
        }


        let np = nextProps;
        let pr = this.props;
        if (!deepIsEqual(
                [
                    pr.remoteURL,
                    pr.selectable,
                    pr.showFooter,
                    pr.showHeader,
                    pr.additionalConditions,
                ],
                [
                    np.remoteURL,
                    np.selectable,
                    np.showFooter,
                    np.showHeader,
                    np.additionalConditions,
                ]
            )) {
            if (!PRODUCTION) {
                console.log("[Table] Base props diference")
            }
            return true;
        }

        if (!PRODUCTION) {
            console.log("Table should update: false");
        }

        return should;
    }*/

    componentWillReceiveProps(nextProps) {

        let columns = [...nextProps.columns];
        for (let i in columns) {
            columns[i] = this.prepareColumnData(columns[i]);
        }
        if (JSON.stringify(columns) != JSON.stringify(this.state.columns)) {
            this.setState({columns: columns});
        }

        if (nextProps.filters) {
            var nextJSON = JSON.stringify(nextProps.filters);
            if (nextJSON != JSON.stringify(this.state.filters)) {
                this.setState({
                    filters: deepCopy(nextProps.filters),
                    currentPage: 1
                }, this.load);
            }
        }
    }

    public getRequestData(): IDataQuery {
        let trimmedData = [...this.state.columns];

        for (let i = 0; i < trimmedData.length; i++) {
            trimmedData[i] = {...trimmedData[i]};
            trimmedData[i].filter = null;
            trimmedData[i].events = null;
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

        this.state.dataSourceError = "";

        this.setState({loading: true});

        let setStateAfterLoad = (input, callback = null) => {
            this.setState({
                data: input.data.slice(0),
                countAll: 0 + parseInt(input.countAll),
                loading: false,
                dataSourceDebug: input.debug ? input.debug : false,
                firstLoaded: true,
                selection: [],
                allChecked: false
            }, callback);
            if (this.props.onDataChange) {
                this.props.onDataChange(input.data.slice(0));
            }

        }

        if (this.props.remoteURL) {
            if (this.xhrConnection) {
                this.xhrConnection.abort();
            }

            let comm = new Comm(this.props.remoteURL, "PUT");
            comm.on(Comm.EVENTS.SUCCESS, (data) => {
                setStateAfterLoad(data);
            });
            comm.setData(this.getRequestData());
            comm.on(Comm.EVENTS.FINISH, () => this.setState({loading: false}));
            this.xhrConnection = comm.send();

        } else if (this.props.dataProvider) {
            let result = this.props.dataProvider(this.getRequestData());

            if (result instanceof Promise) {
                result.then((data) => {
                    setStateAfterLoad(data, () => {
                        if (data.decorator != undefined) {
                            let result = data.decorator(this.getRequestData(), deepCopy(data));
                            if (result instanceof Promise) {
                                result.then((data) => {
                                    setStateAfterLoad(data);
                                });
                            } else {
                                setStateAfterLoad(result);
                            }
                        }
                    });
                })
            } else {
                setStateAfterLoad(result);
            }
        }
    }

    handleStateRemove() {
        delete  window.localStorage[this.hashCode];
        if (confirm('Wyczyszczono dane tabelki, czy chcesz odświeżyć stronę?')) {
            window.location.reload();
        }
    }

    handleFilterChanged(filterValue: IFilterValue) {


        this.state.filters[filterValue.field] = filterValue;
        this.setState({currentPage: 1, filters: this.state.filters}, this.load);
        if (this.props.onFiltersChange) {
            this.props.onFiltersChange(deepCopy(this.state.filters));
        }

    }

    handleFilterDelete(key) {
        delete this.state.filters[key];
        this.setState({currentPage: 1, filters: this.state.filters}, this.load);
        if (this.props.onFiltersChange) {
            this.props.onFiltersChange(deepCopy(this.state.filters));
        }
    }

    handleOrderDelete(field) {
        delete this.state.order[field]
        this.setState({}, this.load);
    }

    headClicked(index, e) {

        let column = this.state.columns.filter(c => c !== null && c.display === true)[index];

        if (!column.orderField)
            return;

        let field = null;

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
            this.setState({currentPage: newPage, selection: [], allChecked: false}, () => this.load());
        }
    }

    toggleFixedLayout() {
        this.setState({
            fixedLayout: !this.state.fixedLayout
        });
    }

    handleBodyResizeStart(e) {
        this.tmpDragStartY = e.clientY
        //this.tmpCurrHeight = this.state.bodyHeight;
    }

    handleBodyResize(e) {
        if (e.clientY) {
            //this.setState({bodyHeight:  this.tmpCurrHeight + (-this.tmpDragStartY + e.clientY)});
        }
    }

    handleBodyResizeEnd(e) {
        //this.setState({bodyHeight: this.tmpCurrHeight + (-this.tmpDragStartY + e.clientY)});
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
            this.props.onSelectionChange(tmp);
        }

        this.setState({selection: s});

    }

    private prepareColumnData(inData: IColumnData): IColumnData {
        if (inData === null) {
            return null;
        }

        if (inData instanceof ColumnHelper) {
            inData = inData.get();
        }

        let data: IColumnData = {
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
            'header': {},
            'events': {
                'click': [],
                'enter': [],
                'leave': []
            },
            'filter': [{
                component: TextFilter,
                field: inData.field,
                caption: inData.field,

            }]
        }

        data = {...data, ...inData};


        data.orderField = data.orderField || data.field;
        data.filter.forEach(el => el.field = el.field || inData.field)


        return data;
    }

    render() {
        const columns = deepCopy(this.state.columns);

        return (
            <div className={'w-table ' + (this.state.loading ? 'w-table-loading' : '')} tabIndex={0} onKeyDown={this.handleKeyDown.bind(this)}>
                <div className="w-table-loader">
                    <span><i></i><i></i><i></i><i></i></span>
                </div>
                <div className="w-table-top">
                    <FiltersPresenter order={this.state.order} filters={this.state.filters}
                                      FilterDelete={this.handleFilterDelete.bind(this)}
                                      orderDelete={this.handleOrderDelete.bind(this)}
                    />
                </div>

                <table>
                    {this.props.showHeader && <Thead
                        selectable={this.props.selectable}
                        columns={columns}
                        order={deepCopy(this.state.order)}
                        filters={deepCopy(this.state.filters)}
                        onFilterChanged={this.handleFilterChanged.bind(this)}
                        onCellClicked={this.headClicked.bind(this)}
                        onCheckAllClicked={this.handleCheckClicked.bind(this, 'all')}
                        allChecked={this.state.allChecked}

                    />}
                    <tbody>
                    {this.state.dataSourceError != "" && <Error colspan={columns.length + 1} error={this.state.dataSourceError}/>}
                    {!this.state.loading && this.state.data.length == 0 && <EmptyResult colspan={columns.length + 1}/>}
                    {this.state.loading && !this.state.firstLoaded && <Loading colspan={columns.length + 1}/>}
                    {/*TODO sprawdzić dlaczego first loaded jest potrzebne*/}
                    {/*this.state.firstLoaded && */}
                    {this.state.data.length > 0 && <Tbody
                        rowClassTemplate={this.props.rowClassTemplate}
                        rowStyleTemplate={this.props.rowStyleTemplate}
                        selection={deepCopy(this.state.selection)}
                        onCheck={this.handleCheckClicked.bind(this)}
                        selectable={this.props.selectable}
                        columns={columns} filters={this.state.filters}
                        order={this.state.order} loading={this.state.loading}
                        data={this.state.data}
                    />}
                    </tbody>

                    {this.props.showFooter && <tfoot>
                    {this.state.firstLoaded &&
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
