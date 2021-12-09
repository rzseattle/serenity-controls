import React, { useState } from "react";
import { IDataQuery, IFilterValue, IGroupByData, IRowClassTemplate, IRowStyleTemplate } from "../Table/Interfaces";
import { PrintJSON } from "../PrintJSON";
import { IGridColumnData } from "./interfaces/IGridColumnData";
import { IGridData } from "./interfaces/IGridData";
import GridHead from "./parts/GridHead";
import GridBody from "./parts/GridBody";
import GridFoot from "./parts/GridFoot";
import styles from "./DataGrid.module.sass";

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
    columns: IGridColumnData<T>[];
    showFooter?: boolean;
    showHeader?: boolean;
    additionalConditions?: any;
    filters?: { [key: string]: IFilterValue };
    onFiltersChange?: (filtersValue: { [key: string]: IFilterValue }) => any;
    onDataChange?: (data: any, count: number) => any;
    data: IGridData<T>;

    groupBy?: IGroupByData[];

    autofocus?: boolean;
}

const DataGrid = <T,>(props: IGridProps<T>) => {
    const [c, sc] = useState<number>(0);
    if (props.columns.length === 0) {
        return null;
    }

    return (
        <div>
            <div onClick={() => sc((r) => ++r)}>{c}</div>
            <PrintJSON json={props.columns} />
            <hr />
            <div className={styles.gridLayout} style={{gridTemplateColumns: `repeat(${props.columns.length}, 1fr)`}}>
                <GridHead columns={props.columns} />
                <GridBody columns={props.columns} rows={props.data.rows} />
            </div>
            <GridFoot />
            {/*<PrintJSON json={props.data} />*/}
        </div>
    );
};

export default DataGrid;
