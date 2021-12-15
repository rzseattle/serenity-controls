import React from "react";
import { IGridColumnData } from "./interfaces/IGridColumnData";
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
import { PrintJSON } from "../PrintJSON";

type ISelectionChangeEvent = (selected: any[]) => any;

interface IGridProps<T> {
    controlKey?: string;

    selectable?: boolean;
    onSelectionChange?: ISelectionChangeEvent;
    onPage?: number;
    rememberState?: boolean;
    rowClassTemplate?: IGridRowClassProvider<T>;
    rowStyleTemplate?: IGridRowStyleProvider<T>;
    columns: IGridColumnData<T>[];
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
}

const defaultProps: Partial<IGridProps<any>> = {
    showHeader: true,
    showFooter: true,
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
                return p.concat(c.width ? c.width + "px" : "1fr");
            }, [])
            .join(" ");
    };

    return (
        <div>
            {/*<div onClick={() => sc((r) => ++r)}>{c}</div>*/}

            <div className={styles.gridLayout} style={{ gridTemplateColumns: getWidths() }}>
                {props.showHeader && <GridHead columns={props.columns} />}
                <GridBody columns={props.columns} rows={props.data.rows} />
            </div>
            {props.showFooter && <GridFoot />}
            <div><PrintJSON json={props.filters} /></div>
            <div><PrintJSON json={props.sorters} /></div>
        </div>
    );
};

export default DataGrid;
