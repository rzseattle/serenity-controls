import React from "react";
import { IGridColumn } from "../interfaces/IGridColumn";
import styles from "./GridBody.module.sass";
import { nanoid } from "nanoid";
import { IGridRowClassProvider } from "../interfaces/IGridRowClassProvider";
import { IGridRowStyleProvider } from "../interfaces/IGridRowStyleProvider";
import { IGridCellClassProvider } from "../interfaces/IGridCellClassProvider";
import { IGridCellStyleProvider } from "../interfaces/IGridCellStyleProvider";
import GridRow from "./GridRow";
import { useGridContext } from "../config/GridContext";

interface IGridBodyProps<T> {
    columns: IGridColumn<T>[];
    rows: T[];
    rowClassTemplate?: IGridRowClassProvider<T>;
    rowStyleTemplate?: IGridRowStyleProvider<T>;
    cellClassTemplate?: IGridCellClassProvider<T>;
    cellStyleTemplate?: IGridCellStyleProvider<T>;
}

const GridBody = <T,>(props: IGridBodyProps<T>) => {
    const rows = props.rows;
    const config = useGridContext();

    //const [x, setRefreshState] = useState(0);

    let keyField: string | null = null;
    if (rows.length > 0) {
        if ("id" in rows[0]) {
            keyField = "id";
        } else if ("key" in rows[0]) {
            keyField = "key";
        }
    }

    const getKey = (row: T): string => {
        if (keyField !== null) {
            return "" + row[keyField as keyof T];
        }
        return nanoid();
    };

    return (
        <>

            {rows.map((row, rowNumber) => {
                const rowProperties: React.HTMLAttributes<HTMLDivElement> = {};
                let rowClass = styles.row;
                if (props.rowClassTemplate !== undefined && props.rowClassTemplate !== null) {
                    rowClass = [...props.rowClassTemplate(row, rowNumber), styles.row].join(" ");
                }
                rowProperties.className = rowClass;

                if (props.rowStyleTemplate !== undefined && props.rowStyleTemplate !== null) {
                    rowProperties.style = props.rowStyleTemplate(row, rowNumber);
                }

                return (
                    <GridRow
                        rowProperties={rowProperties}
                        rowNumber={rowNumber}
                        key={getKey(row)}
                        row={row}
                        columns={props.columns}
                        cellStyleTemplate={props.cellStyleTemplate}
                        cellClassTemplate={props.cellClassTemplate}
                    />
                );
            })}
        </>
    );
};

export default GridBody;
