import React from "react";
import { IGridColumn } from "./interfaces/IGridColumn";
import { IGridData } from "./interfaces/IGridData";
import GridHead from "./parts/GridHead";
import GridBody from "./parts/GridBody";
import GridFoot from "./parts/GridFoot";
import styles from "./DataGrid.module.sass";
import { IGroupByData } from "./interfaces/IGroupByData";
import { IGridFilter } from "./interfaces/IGridFilter";
import { IGridSorter } from "./interfaces/IGridSorter";
import { IGridRowClassProvider } from "./interfaces/IGridRowClassProvider";
import { IGridRowStyleProvider } from "./interfaces/IGridRowStyleProvider";
import { IGridCellClassProvider } from "./interfaces/IGridCellClassProvider";
import { IGridCellStyleProvider } from "./interfaces/IGridCellStyleProvider";

type ISelectionChangeEvent = (selected: any[]) => any;

interface IGridProps<T> {
    controlKey?: string;

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

    sorters?: IGridSorter[];
    onSortersChange?: (filtersValue: IGridSorter[]) => void;

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

    //const [c, sc] = useState<number>(0);
    if (props.columns.length === 0) {
        return null;
    }

    const getWidths = (): string => {
        return props.columns
            .reduce((p, c) => {
                let minWidth: string = null;
                let maxWidth: string = null;
                let width: string = null;

                if (c.minWidth !== undefined && c.maxWidth !== null) {
                    minWidth = Number.isInteger(c.minWidth) ? c.minWidth + "px" : (c.minWidth as string);
                }
                if (c.maxWidth !== undefined && c.maxWidth !== null) {
                    maxWidth = Number.isInteger(c.maxWidth) ? c.maxWidth + "px" : (c.maxWidth as string);
                }
                if (c.width !== undefined && c.width !== null) {
                    width = Number.isInteger(c.width) ? c.width + "px" : (c.width as string);
                } else {
                    width = "1fr";
                }
                if (minWidth !== null || maxWidth !== null) {
                    const min = minWidth ?? 0;
                    const max = maxWidth ?? width;
                    width = `minmax(${min}, ${max})`;
                }

                return p.concat(width);
            }, [])
            .join(" ");
    };

    return (
        <div>
            {/*<div onClick={() => sc((r) => ++r)}>{c}</div>*/}
            <div className={styles.gridLayout} style={{ gridTemplateColumns: getWidths() }}>
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
