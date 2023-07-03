import React, { Dispatch, SetStateAction, useEffect, useImperativeHandle, useRef, useState } from "react";
import { DataGrid, IGridProps } from "../../DataGrid";
import { IGridFilter } from "../../interfaces/IGridFilter";
import { IGridOrder } from "../../interfaces/IGridOrder";
import { IGridColumn } from "../../interfaces/IGridColumn";
import Pagination from "../pagination/Pagination";
import { ColumnTemplate } from "../columns/ColumnTemplate";
import { HotKeys } from "../../../HotKeys";
import { Key } from "ts-key-enum";
import { FullDataGridData } from "./Types";
import { IGridController } from "../../interfaces/IGridController";

export interface IDataQueryParams {
    filters: Partial<IGridFilter>[];
    order: IGridOrder[];
    fields: Array<string | number>;
    page: { current: number; onPage: number };
}

export type IFullGridDataProvider<T> = ({ filters, order, fields }: IDataQueryParams) => Promise<FullDataGridData<T>>;

export interface IFullGridController<T extends object> extends IGridController<T>{
    getQueryDataParams: () => IDataQueryParams
}

export interface IFullGridProps<T extends object> {
    passController?: (controller: IFullGridController<T>) => any;
    controllerRef?: React.Ref<IFullGridController<T>> | null;
    dataProvider: IFullGridDataProvider<T>;
    columns: (ColumnTemplate<T> | false | null)[];
    filtersState?: [IGridFilter[], Dispatch<SetStateAction<IGridFilter[]>>];
    orderState?: [IGridOrder[], Dispatch<SetStateAction<IGridOrder[]>>];
    onPage?: number;
    gridProps?: Partial<IGridProps<T>>;
}

// eslint-disable-next-line react/display-name
const FullGrid = <T extends object,>(props: IFullGridProps<T>) => {
    const isMounted = useRef(false);
    let [filters, setFilters] = useState<IGridFilter[]>([]);
    let [order, setOrder] = useState<IGridOrder[]>([]);
    if (props.filtersState !== undefined) {
        [filters, setFilters] = props.filtersState;
    }

    if (props.filtersState !== undefined) {
        [filters, setFilters] = props.filtersState;
    }

    if (props.orderState) {
        [order, setOrder] = props.orderState;
    }

    const [currentPage, setCurrentPage] = useState(1);
    const [onPage, setOnPage] = useState(props.onPage ?? 10);
    const [columns, setColumns] = useState<IGridColumn<T>[]>([]);

    const [data, setData] = useState<T[]>([]);
    const [rowCount, setRowCount] = useState<number>(0);
    const [isInLoadingState, setLoadingState] = useState(true);

    const [error, setError] = useState("");
    const [debug, setDebug] = useState("");

    const [rebuild /*setRebuild*/] = useState(0);

    useEffect(
        () => {
            const tmpColumns: IGridColumn<T>[] = [];
            const tmpFilters: IGridFilter[] = [];
            const tmpOrder: IGridOrder[] = [];
            props.columns.forEach((el) => {
                if (el !== false && el !== null) {
                    tmpColumns.push(el.column);
                    el.filters.forEach((filter) => tmpFilters.push(filter));
                    el.order.forEach((order) => tmpOrder.push(order));
                }
            });
            setColumns(tmpColumns);

            setFilters(tmpFilters);
            setOrder(tmpOrder);
        },
        /*
         * If control is provided to parent component we can't refresh the controlled state
         * because it forces to refresh the component infinitely
         */
        process.env.NODE_ENV === "development" && props.filtersState === undefined && props.orderState === undefined
            ? [props.columns]
            : [rebuild],
    );

    useEffect(() => {
        setCurrentPage(1);
    }, [filters]);


    const getQueryDataParams = (): IDataQueryParams => {
        return {
            filters: filters
                .filter((el) => el.value !== undefined && el.value.length > 0)
                .map((el) => ({ field: el.field, value: el.value })),
                order: order.filter((el) => el.dir !== undefined),
            fields: columns.map((column) => column.field).filter((field) => field !== undefined),
            page: { current: currentPage, onPage },
        }
    }

    const loadDada = () => {
        setLoadingState(true);
        setError("");
        props
            .dataProvider(getQueryDataParams())
            .then((result) => {
                setData(result.rows);
                setRowCount(result.count);
                setDebug(result.debug);
                setLoadingState(false);
            })
            .catch((e) => {
                setError(e.message);
            });
    };

    useEffect(() => {
        if (isMounted.current) {
            loadDada();
        }
    }, [onPage, currentPage, filters, order, columns]);
    //filters <- don't track filters because current page is changing

    //props.columns

    useEffect(() => {
        isMounted.current = true;

        return () => {
            isMounted.current = false;
        };
    }, []);

    if (props.passController !== undefined) {
        props.passController({
            reload: () => {
                loadDada();
            },
            getData: () => {
                return data;
            },
            getRowsCount: () => {
                return rowCount;
            },
            getQueryDataParams: ()=>{
                return getQueryDataParams();
            }
        });
    }

    useImperativeHandle(props.controllerRef, () => ({
        reload: () => {
            loadDada();
        },
        getData: () => {
            return data;
        },
        getRowsCount: () => {
            return rowCount;
        },
        getQueryDataParams: ()=>{
            return getQueryDataParams();
        }
    }));

    return (
        <HotKeys
            actions={[
                {
                    key: Key.ArrowRight,
                    handler: () => {
                        if (currentPage < rowCount) {
                            setCurrentPage((page) => page + 1);
                        }
                    },
                },
                {
                    key: Key.ArrowLeft,
                    handler: () => {
                        if (currentPage > 1) {
                            setCurrentPage((page) => page - 1);
                        }
                    },
                },
            ]}
        >
            <div tabIndex={0}>
                <DataGrid
                    controller={{
                        reload: () => {
                            loadDada();
                        },
                        getData: () => {
                            return data;
                        },
                        getRowsCount: () => {
                            return rowCount;
                        },
                    }}
                    showHeader={true}
                    showFooter={true}
                    isInLoadingState={isInLoadingState}
                    columns={columns}
                    filters={filters}
                    order={order}
                    onOrderChange={(order) => {
                        setOrder(order);
                    }}
                    onFiltersChange={(filter) => setFilters(filter)}
                    data={data}
                    footer={() => {
                        return (
                            <Pagination
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                onPage={onPage}
                                setOnPage={setOnPage}
                                all={rowCount}
                                reload={() => loadDada()}
                            />
                        );
                    }}
                    {...props.gridProps}
                />

                {error && <div>{error}</div>}
                {debug && <pre>{debug}</pre>}
            </div>
        </HotKeys>
    );
};

export default FullGrid;
