import React, { useEffect, useMemo, useState } from "react";
import { IGridColumn } from "./interfaces/IGridColumn";
import { IGridData } from "./interfaces/IGridData";

import { IGroupByData } from "./interfaces/IGroupByData";
import { IGridFilter } from "./interfaces/IGridFilter";
import { IGridRowClassProvider } from "./interfaces/IGridRowClassProvider";
import { IGridCellClassProvider } from "./interfaces/IGridCellClassProvider";
import { IGridCellStyleProvider } from "./interfaces/IGridCellStyleProvider";
import { getColumnsWidths } from "./helpers/helpers";
import { IGridOrder } from "./interfaces/IGridOrder";
import { useGridContext } from "./config/GridContext";
import styles from "./DataGrid.module.sass";
import { IOrderChange } from "./interfaces/IOrderChangeCallback";
import { IFiltersChange } from "./interfaces/IFiltersChange";
import GridHead from "./parts/Head/GridHead/GridHead";
import GridBody from "./parts/Body/GridBody/GridBody";
import GridFoot from "./parts/Footer/GridFoot/GridFoot";

type ISelectionChangeEvent = (selected: any[]) => any;

export interface IGridProps<T> {
    controlKey?: string;
    className?: string;

    selectable?: boolean;
    onSelectionChange?: ISelectionChangeEvent;

    rememberState?: boolean;

    rowClassTemplate?: IGridRowClassProvider<T>;
    cellClassTemplate?: IGridCellClassProvider<T>;
    cellStyleTemplate?: IGridCellStyleProvider<T>;

    columns: IGridColumn<T>[];
    showFooter?: boolean;
    showHeader?: boolean;
    additionalConditions?: any;

    groupBy?: IGroupByData<T>[];
    autofocus?: boolean;

    filters?: IGridFilter[];
    onFiltersChange?: IFiltersChange;

    data: IGridData<T>;
    onDataChange?: (data: any, count: number) => void;

    order?: IGridOrder[];
    onOrderChange?: IOrderChange;

    footer?: (tableData: IGridProps<T>) => JSX.Element | string;
    isInLoadingState?: boolean;
}

const defaultProps: Partial<IGridProps<any>> = {
    showHeader: false,
    showFooter: false,
    autofocus: false,
    order: [],
    filters: [],
    isInLoadingState: false,
};

const DataGrid = <T,>(inProps: IGridProps<T>) => {
    const config = useGridContext();
    const props = { ...defaultProps, ...inProps };
    const widths = useMemo<string>(() => {
        return getColumnsWidths(props.columns);
    }, [props.columns]);

    //const [c, sc] = useState<number>(0);
    if (props.columns.length === 0) {
        return null;
    }

    if (config === undefined || config === null) {
        return <>DataGrid: No context found</>;
    }

    const className =
        props.className !== undefined ? props.className + " " + styles.gridLayoutCore : config.gridClassName;

    const showLoadingLayer = props.isInLoadingState && props.data.length > 0;
    return (
        <div style={{ position: "relative" }}>
            <div
                className={
                    styles.loadingLayer +
                    " " +
                    (showLoadingLayer ? styles.loadingLayerFadeIn : styles.loadingLayerFadeOut)
                }
            >
                {config.locale.loading}
            </div>

            <div className={className} style={{ display: "grid", gridTemplateColumns: widths }}>
                {props.showHeader && (
                    <GridHead
                        order={props.order}
                        onOrderChange={inProps.onOrderChange}
                        filters={props.filters}
                        onFiltersChange={props.onFiltersChange}
                        columns={props.columns}
                    />
                )}

                {props.data.length === 0 && (
                    <div style={{ gridColumn: "1 / " + (props.columns.length + 1), textAlign: "center" }}>
                        <div>
                            {!props.isInLoadingState &&
                                config.common.components.noData({ communicate: config.locale.noData })}
                            {props.isInLoadingState &&
                                config.common.components.loading({ communicate: config.locale.loading })}
                        </div>
                    </div>
                )}

                <GridBody
                    columns={props.columns}
                    rows={props.data}
                    rowClassTemplate={props.rowClassTemplate}
                    cellClassTemplate={props.cellClassTemplate}
                    cellStyleTemplate={props.cellStyleTemplate}
                />
            </div>
            {props.showFooter && <GridFoot>{props.footer && props.footer(props)}</GridFoot>}
            {/*<div><PrintJSON json={props.filters} /></div>*/}
            {/*<div><PrintJSON json={props.sorters} /></div>*/}
        </div>
    );
};

export default DataGrid;

//
// export interface IGroupByData {
//     field?: string;
//     equalizer?: (prevRow: any, nextRow: any) => boolean;
//     labelProvider?: (nextRow: any, prevRow: any) => string | ReactElement<any> | StatelessComponent;
// }
//
//
// groupBy?: IGroupByData[];
//
//
// public groupByGetInfo = (row1: any, row2: any) => {
//     const info = [];
//     for (const group of this.props.groupBy) {
//         if (group.field !== undefined) {
//             if (row1 === null || row1[group.field] != row2[group.field]) {
//                 info.push({ label: row2[group.field] });
//             }
//         } else if (group.equalizer !== undefined) {
//             if (row1 === null || group.equalizer(row1, row2)) {
//                 info.push({ label: group.labelProvider(row2, row1) });
//             }
//         }
//     }
//
//     return info;
// };
//
// if (this.props.groupBy.length > 0) {
//     const groupData = this.groupByGetInfo(lastRow, row);
//     if (groupData.length > 0) {
//         lastRow = row;
//         return (
//             <React.Fragment key={key + "_group"}>
//                 <tr>
//                     <td
//                         style={{
//                             backgroundColor: "grey",
//                             color: "white",
//                             width: props.columnWidths[index],
//                         }}
//                         colSpan={columns.length + 1}
//                     >
//                         {groupData.map((el) => (
//                             <React.Fragment key={nanoid()}>{el.label}</React.Fragment>
//                         ))}
//                     </td>
//                 </tr>
//                 {rowToOutput}
//             </React.Fragment>
//         );
//     }
// }
