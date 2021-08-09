import { IColumnData } from "./Interfaces";
import * as React from "react";

export class TableRow extends React.Component<
    any,
    {
        data: { [index: string]: any };
    }
> {
    constructor(props: any, context: any, data: { [p: string]: any }) {
        super(props, context);
        this.state = {
            data: {},
        };
    }

    public setData(index: string, data: any) {
        const tmp: any = {};
        tmp[index] = data;
        this.setState({ data: { ...this.state.data, ...tmp } });
    }

    public getData(index: string, defaultVal: any) {
        return this.state.data[index] || defaultVal;
    }

    public packFn = (val: any, column: IColumnData, row: any) => {
        let templateResult: any = false;
        if (column.template !== null) {
            templateResult = column.template(val, row, column, this);
        }
        return (
            <>
                {column.icon !== null && <column.icon />}
                {column.prepend !== null && column.prepend}
                {templateResult !== false ? templateResult : val ? val : column.default}
                {column.append !== null && column.append}
            </>
        );
    };

    public render() {
        const props = this.props;
        const { columns, row, cache, _key } = this.props;

        const rowProps: any = {};
        if (props.infoRow != null) {
            rowProps.className = this.props.even ? "w-table-row-even" : "w-table-row-odd";
        }
        if (props.rowClassTemplate !== null) {
            rowProps.className += " " + props.rowClassTemplate(row);
        }
        if (props.rowStyleTemplate !== null) {
            rowProps.style = props.rowStyleTemplate(row);
        }

        /*rowProps.onMouseEnter = () => {
            console.log("aaa");
        }*/

        return (
            <>
                <tr {...rowProps}>
                    {props.selectable && (
                        <td className={"w-table-selection-cell"} onClick={props.onCheck}>
                            <input
                                type="checkbox"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    props.onCheck();
                                }}
                                onChange={() => {}}
                                checked={this.props.isSelected}
                            />
                        </td>
                    )}
                    {columns.map((column: IColumnData, index2: number) => {
                        let style = cache[index2].style;
                        if (column.styleTemplate !== null) {
                            style = { ...style, ...column.styleTemplate(row, column) };
                        }
                        let className = null;
                        if (column.classTemplate !== null) {
                            className = cache[index2].classes.concat(column.classTemplate(row, column)).join(" ");
                        } else if (cache[index2].classes.length > 0) {
                            className = cache[index2].classes.join(" ");
                        }

                        const cellProps: any = {};

                        if (className !== null) {
                            cellProps.className = className;
                        }

                        if (style !== null && Object.keys(style).length !== 0) {
                            cellProps.style = style;
                        }

                        if (column.events.click.length > 0) {
                            cellProps.onClick = (event: React.MouseEvent) => {
                                column.events.click.map((callback) => {
                                    callback.bind(this)(row, column, this, event.target, event);
                                });
                            };
                        }
                        if (column.events.mouseUp.length > 0) {
                            cellProps.onMouseUp = (event: React.MouseEvent) => {
                                column.events.mouseUp.map((callback) => {
                                    callback.bind(this)(row, column, this, event.target, event);
                                });
                            };
                            cellProps.onContextMenu = (e: React.MouseEvent) => e.preventDefault();
                        }

                        if (column.events.enter.length > 0) {
                            cellProps.onMouseEnter = (event: React.MouseEvent) => {
                                column.events.enter.map((callback) => {
                                    callback.bind(this)(row, column, this, event.target);
                                });
                            };
                        }
                        if (column.events.leave.length > 0) {
                            cellProps.onMouseLeave = (event: React.MouseEvent) => {
                                column.events.leave.map((callback) => {
                                    callback.bind(this)(row, column, this, event.target);
                                });
                            };
                        }

                        if (column.rowSpan !== null) {
                            cellProps.rowSpan = column.rowSpan;
                        }

                        return (
                            <td key={_key + index2} {...cellProps}>
                                {this.packFn(row[column.field] ? row[column.field] : column.default, column, row)}
                            </td>
                        );
                    })}
                </tr>

                {props.infoRow != null && (
                    <tr className={"w-table-info-row"} {...rowProps}>
                        <td colSpan={12}>{props.infoRow(row)}</td>
                    </tr>
                )}
            </>
        );
    }
}
