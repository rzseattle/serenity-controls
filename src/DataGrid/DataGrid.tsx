import React, { useState } from "react";
import { IDataQuery, IFilterValue, IGroupByData, IRowClassTemplate, IRowStyleTemplate } from "../Table/Interfaces";

import { ITableDataInput } from "../Table";
import { PrintJSON } from "../PrintJSON";
import { IGridColumnData } from "./interfaces/IGridColumnData";
import GridColumnHelper from "./helpers/GridColumnHelper";
import { IGridData } from "./interfaces/IGridData";

type ISelectionChangeEvent = (selected: any[]) => any;

interface IGridProps<T> {
    controlKey?: string;

    dataProvider?: (input: IDataQuery) => Promise<IGridData<T>>;
    selectable?: boolean;
    onSelectionChange?: ISelectionChangeEvent;
    onPage?: number;
    rememberState?: boolean;
    rowClassTemplate?: IRowClassTemplate;
    rowStyleTemplate?: IRowStyleTemplate;
    columns: IGridColumnData<T>[] | GridColumnHelper<T>[];
    showFooter?: boolean;
    showHeader?: boolean;
    additionalConditions?: any;
    filters?: { [key: string]: IFilterValue };
    onFiltersChange?: (filtersValue: { [key: string]: IFilterValue }) => any;
    onDataChange?: (data: any, count: number) => any;
    data?: IGridData<T>;

    groupBy?: IGroupByData[];

    autofocus?: boolean;
}

const DataGrid = <T,>(props: IGridProps<T>) => {
    const [c, sc] = useState<number>(0);
    return (
        <div>
            <div onClick={() => sc((r) => ++r)}>{c}</div>
            <PrintJSON json={props.columns} />
            <hr />
            <PrintJSON json={props.data} />
        </div>
    );
};

export default DataGrid;
