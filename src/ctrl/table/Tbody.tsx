import * as React from "react";
import {deepIsEqual} from "frontend/src/lib/JSONTools";
import uuidv4 from "uuid/v4";
//const uuidv4 = require('uuid/v4');

export default class Tbody extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    public shouldComponentUpdate(nextProps, nextState) {

        return !deepIsEqual(
            [
                this.props.data,
                this.props.selection,
            ],
            [
                nextProps.data,
                nextProps.selection,
            ],
        );
    }

    public render() {
        const props = this.props;

        const packValue = (val, column, row) => {
            let templateResult = false;
            if (column.template) {
                templateResult = column.template(val, row);

            }
            return (
                <>
                    {column.icon ? <i className={"w-table-prepend-icon fa " + column.icon}></i> : ""}
                    {column.prepend ? column.prepend : ""}
                    {templateResult ? (typeof templateResult == "string" ? <span dangerouslySetInnerHTML={{__html: (column.template(val, row))}}></span> : templateResult) : (val ? val : column.default)}
                    {column.append ? column.append : ""}
                </>
            );
        };

        const columns = props.columns.filter((el) => el !== null && el.display === true);


        return props.data.map((row, index) =>

            <Row
                key={uuidv4()}
                columns={columns}
                row={row}
                order={props.order}
                filters={props.filters}
                packFn={packValue}
                rowClassTemplate={props.rowClassTemplate}
                rowStyleTemplate={props.rowStyleTemplate}
                selectable={this.props.selectable}
                isSelected={this.props.selection.includes(index)}
                onCheck={() => this.props.onCheck(index)}

            />,
        );

    }
}
//00:14:15;10
//00:14:42;18

export class Row extends React.PureComponent<any, any> {

    public render() {

        const props = this.props;
        const {columns, row, packFn, order, filters} = this.props;

        const cache = {};

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
                column.events.click && column.events.click.length > 0 ||
                column.events.mouseUp && column.events.mouseUp.length > 0
            ) {
                cache[index].classes.push("w-table-cell-clickable");
            }
            cache[index].classes = cache[index].classes.concat(column.class);

            cache[index].style = null;
            if (column.width) {
                cache[index].style = {width: column.width};
            }


        }

        return (<tr
            className={props.rowClassTemplate ? props.rowClassTemplate(row) : ""}
            style={props.rowStyleTemplate ? props.rowStyleTemplate(row) : {}}

        >
            {props.selectable && <td className={"w-table-selection-cell"}>
                <input type="checkbox" onChange={() => props.onCheck()} checked={this.props.isSelected}/>
            </td>}
            {columns.map((column, index2) => {
                let style = cache[index2].style;
                if (column.styleTemplate != null) {
                    style = {...style, ...column.styleTemplate(row, column)};
                }
                return (
                    <td
                        key={uuidv4()}
                        style={style}
                        onClick={column.events.click.length > 0 ? (event) => {
                            column.events.click.map((callback) => {
                                callback.bind(this)(row, column, this, event.target);
                            });
                        } : null}
                        onMouseUp={column.events.mouseUp.length > 0 ? (event) => {
                            column.events.mouseUp.map((callback) => {
                                callback.bind(this)(row, column, this, event.target, event);
                            });
                        } : null}
                        onMouseEnter={column.events.enter.length > 0 ? (event) => {
                            column.events.enter.map((callback) => {
                                callback.bind(this)(row, column, event, this);
                            });
                        } : null}
                        onMouseLeave={column.events.leave.length > 0 ? (event) => {
                            column.events.leave.map((callback) => {
                                callback.bind(this)(row, column, event, this);
                            });
                        } : null}
                        className={cache[index2].classes.concat(column.classTemplate !== null ? column.classTemplate(row, column) : []).join(" ")}
                        onContextMenu={(e) => e.preventDefault()}

                    >
                        {packFn(row[column.field] ? row[column.field] : column.default, column, row)}
                    </td>
                );
            })}
        </tr>);
    }
}

const Cell = (props) => {

};

