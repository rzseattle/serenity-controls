import React, { useEffect, useState } from "react";
import DataGrid from "../DataGrid";
import { IGridFilter } from "../interfaces/IGridFilter";
import { IGridOrder } from "../interfaces/IGridOrder";
import { IGridColumn } from "../interfaces/IGridColumn";
import Pagination from "../plugins/pagination/Pagination";
import { ColumnTemplate } from "./columnTemplates/ColumnTemplate";
import { IColumnTemplate } from "./columnTemplates/IColumnTemplate";

export type IFullGridDataProvider<T> = ({
    filters,
    order,
    columns,
}: {
    filters: IGridFilter[];
    order: IGridOrder[];
    columns: IGridColumn<T>[];
    page: { current: number; onPage: number };
}) => Promise<{ rows: T[]; count: number }>;

interface IFullGridProps<T> {
    columns: ColumnTemplate<T>[];
    dataProvider: IFullGridDataProvider<T>;
}

const FullGrid = <T,>(props: IFullGridProps<T>) => {
    const [filters, setFilters] = useState<IGridFilter[]>([]);
    const [order, setOrder] = useState<IGridOrder[]>([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [onPage, setOnPage] = useState(10);
    const [columns, setColumns] = useState<IGridColumn<T>[]>([]);

    const [data, setData] = useState<T[]>([]);
    const [rowCount, setRowCount] = useState<number>(0);
    const [isInLoadingState, setLoadingState] = useState(true);

    useEffect(() => {
        const tmpColumns: IGridColumn<T>[] = [];
        const tmpFilters: IGridFilter[] = [];
        const tmpOrder: IGridOrder[] = [];
        props.columns.forEach((el) => {

            tmpColumns.push(el.column);
            el.filters.forEach((filter) => tmpFilters.push(filter));
            el.order.forEach((order) => tmpOrder.push(order));
        });
        setColumns(tmpColumns);
        setFilters(tmpFilters);
        setOrder(tmpOrder);
    }, []);

    useEffect(() => {
        setLoadingState(true);
        props
            .dataProvider({ filters, order, columns: columns, page: { current: currentPage, onPage } })
            .then((result) => {
                setData(result.rows);
                setRowCount(result.count);
                setLoadingState(false);
            });
    }, [onPage, currentPage, props.columns, filters, order]);
    return (
        <div>
            <DataGrid
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
                        />
                    );
                }}
            />
        </div>
    );
};

export default FullGrid;
