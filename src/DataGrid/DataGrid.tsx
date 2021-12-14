import React, { useState } from "react";
import { IDataQuery, IFilterValue, IRowClassTemplate, IRowStyleTemplate } from "../Table/Interfaces";
import { IGridColumnData } from "./interfaces/IGridColumnData";
import { IGridData } from "./interfaces/IGridData";
import GridHead from "./parts/GridHead";
import GridBody from "./parts/GridBody";
import GridFoot from "./parts/GridFoot";
import styles from "./DataGrid.module.sass";
import { IGroupByData } from "./interfaces/IGroupByData";

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

    groupBy?: IGroupByData<T>[];

    autofocus?: boolean;
}

const DataGrid = <T,>(props: IGridProps<T>) => {
    const [c, sc] = useState<number>(0);
    if (props.columns.length === 0) {
        return null;
    }

    const getWidths = (): string => {
        return props.columns
            .reduce((p, c) => {
                return p.concat(c.width ? c.width + "px" : "1fr");
            }, [])
            .join(" ");
    };

    return (
        <div>
            <div onClick={() => sc((r) => ++r)}>{c}</div>

            <div className={styles.gridLayout} style={{ gridTemplateColumns: getWidths() }}>
                <GridHead columns={props.columns} />
                <GridBody columns={props.columns} rows={props.data.rows} />
            </div>
            <GridFoot />
        </div>
    );
};

export default DataGrid;
