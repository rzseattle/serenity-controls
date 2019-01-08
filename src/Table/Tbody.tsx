import * as React from "react";
import { deepIsEqual } from "../lib/JSONTools";
import uuidv4 from "uuid/v4";
import { ICellTemplate, IColumnData, IOrder } from "./Interfaces";
import { IFilterValue } from "../filters/Intefaces";
import { IGroupByData, IRowClassTemplate, IRowStyleTemplate } from "./Table";
import { Icon } from "../Icon";
import { TableRow } from "./TableRow";

// const uuidv4 = require('uuid/v4');

interface ITbodyProps {
    data: any[];
    selection: any[];
    columns: IColumnData[];
    selectable: boolean;

    order: { [index: string]: IOrder };
    filters: { [index: string]: IFilterValue };

    groupBy?: IGroupByData[];

    rowClassTemplate: IRowClassTemplate;

    rowStyleTemplate: IRowStyleTemplate;

    infoRow: ICellTemplate;

    onCheck: (index: string | number) => any;
    loading: boolean;
}

export default class Tbody extends React.Component<ITbodyProps> {
    constructor(props: ITbodyProps) {
        super(props);
    }

    public shouldComponentUpdate(nextProps: ITbodyProps, nextState: ITbodyProps) {
        const ret = !deepIsEqual(
            [this.props.data, this.props.selection, this.props.columns, this.props.selectable],
            [nextProps.data, nextProps.selection, nextProps.columns, nextProps.selectable],
            true,
        );

        return ret;
    }

    public groupByGetInfo = (row1: any, row2: any) => {
        const info = [];
        for (const group of this.props.groupBy) {
            if (group.field !== undefined) {
                if (row1 === null || row1[group.field] != row2[group.field]) {
                    info.push({ label: row2[group.field] });
                }
            } else if (group.equalizer !== undefined) {
                if (row1 === null || group.equalizer(row1, row2)) {
                    info.push({ label: group.labelProvider(row2, row1) });
                }
            }
        }

        return info;
    };

    public render() {
        const props = this.props;

        const columns = props.columns.filter((el) => el !== null && el.display === true);

        const { order, filters } = this.props;
        const cache: any = {};

        for (let index = 0; index < columns.length; index++) {
            const column = columns[index];
            cache[index] = cache[index] || {};
            cache[index].classes = [];
            if (order[column.field] !== undefined) {
                cache[index].classes.push("w-table-sorted w-table-sorted-" + order[column.field].dir);
            }
            if (filters[column.field] !== undefined) {
                cache[index].classes.push("w-table-filtered");
            }
            if (
                (column.events.click && column.events.click.length > 0) ||
                (column.events.mouseUp && column.events.mouseUp.length > 0)
            ) {
                cache[index].classes.push("w-table-cell-clickable");
            }
            cache[index].classes = cache[index].classes.concat(column.class);

            cache[index].style = null;
            if (column.width) {
                cache[index].style = { width: column.width };
            }
        }

        let lastRow: any = null;

        return props.data.map((row, index) => {
            // const key = row.id != undefined ? row.id : uuidv4();
            const key = uuidv4();
            const even = index % 2 == 0;

            const rowToOutput = (
                <TableRow
                    key={key}
                    even={even}
                    _key={key}
                    columns={columns}
                    row={row}
                    rowClassTemplate={props.rowClassTemplate}
                    rowStyleTemplate={props.rowStyleTemplate}
                    selectable={this.props.selectable}
                    isSelected={this.props.selection.includes(index)}
                    onCheck={() => this.props.onCheck(index)}
                    cache={cache}
                    infoRow={this.props.infoRow}
                />
            );

            if (this.props.groupBy.length > 0) {
                const groupData = this.groupByGetInfo(lastRow, row);
                if (groupData.length > 0) {
                    lastRow = row;
                    return (
                        <>
                            <tr key={key + "_group"}>
                                <td style={{ backgroundColor: "grey", color: "white" }} colSpan={columns.length + 1}>
                                    {groupData.map((el) => (
                                        <React.Fragment key={uuidv4()}>{el.label}</React.Fragment>
                                    ))}
                                </td>
                            </tr>
                            {rowToOutput}
                        </>
                    );
                }
            }
            return rowToOutput;
        });
    }
}
