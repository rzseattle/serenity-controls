import React, { useMemo } from "react";
import { IGridColumn } from "./interfaces/IGridColumn";
import { IGridData } from "./interfaces/IGridData";
import GridHead from "./parts/GridHead";
import GridBody from "./parts/GridBody";
import GridFoot from "./parts/GridFoot";
import styles from "./DataGrid.module.sass";
import { IGroupByData } from "./interfaces/IGroupByData";
import { IGridFilter } from "./interfaces/IGridFilter";
import { IGridRowClassProvider } from "./interfaces/IGridRowClassProvider";
import { IGridRowStyleProvider } from "./interfaces/IGridRowStyleProvider";
import { IGridCellClassProvider } from "./interfaces/IGridCellClassProvider";
import { IGridCellStyleProvider } from "./interfaces/IGridCellStyleProvider";
import { getColumnsWidths } from "./helpers/helpers";
import { IGridOrder } from "./interfaces/IGridOrder";

type ISelectionChangeEvent = (selected: any[]) => any;

interface IGridProps<T> {
    controlKey?: string;
    className?: string;

    selectable?: boolean;
    onSelectionChange?: ISelectionChangeEvent;
    onPage?: number;
    rememberState?: boolean;

    rowClassTemplate?: IGridRowClassProvider<T>;
    rowStyleTemplate?: IGridRowStyleProvider<T>;
    cellClassTemplate?: IGridCellClassProvider<T>;
    cellStyleTemplate?: IGridCellStyleProvider<T>;

    columns: IGridColumn<T>[];
    showFooter?: boolean;
    showHeader?: boolean;
    additionalConditions?: any;

    groupBy?: IGroupByData<T>[];
    autofocus?: boolean;

    filters?: IGridFilter[];
    onFiltersChange?: (filtersValue: IGridFilter[]) => void;

    data: IGridData<T>;
    onDataChange?: (data: any, count: number) => void;

    order?: IGridOrder[];
    onOrderChange?: (filtersValue: IGridOrder[]) => void;

    footer?: (tableData: IGridProps<T>) => JSX.Element | string;
}

const defaultProps: Partial<IGridProps<any>> = {
    showHeader: false,
    showFooter: false,
    onPage: 25,
    autofocus: false,
};

const DataGrid = <T,>(inProps: IGridProps<T>) => {
    const props = { ...defaultProps, ...inProps };
    const widths = useMemo<string>(() => {
        return getColumnsWidths(props.columns);
    }, [props.columns]);

    //const [c, sc] = useState<number>(0);
    if (props.columns.length === 0) {
        return null;
    }

    return (
        <div>
            {/*<div onClick={() => sc((r) => ++r)}>{c}</div>*/}
            <div
                className={props.className !== undefined ? props.className + " " + styles.gridLayoutCore : styles.gridLayout}
                style={{ display: "grid", gridTemplateColumns: widths }}
            >
                {props.showHeader && <GridHead columns={props.columns} />}
                <GridBody
                    columns={props.columns}
                    rows={props.data.rows}
                    rowClassTemplate={props.rowClassTemplate}
                    rowStyleTemplate={props.rowStyleTemplate}
                    cellClassTemplate={props.cellClassTemplate}
                    cellStyleTemplate={props.cellStyleTemplate}
                />
            </div>
            {props.showFooter && <GridFoot>{props.footer(props)}</GridFoot>}
            {/*<div><PrintJSON json={props.filters} /></div>*/}
            {/*<div><PrintJSON json={props.sorters} /></div>*/}
        </div>
    );
};

export default DataGrid;
