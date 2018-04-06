import * as React from "react";
import {deepIsEqual} from "frontend/src/lib/JSONTools";
import uuidv4 from "uuid/v4";
import Icon from "../Icon";
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
            if (column.template !== null) {
                templateResult = column.template(val, row);

            }
            return (
                <>
                    {column.icon !== null ? <Icon name={column.icon}/> : null}
                    {column.prepend !== null ? column.prepend : ""}
                    {templateResult !== false ? (typeof templateResult == "string" ? <span dangerouslySetInnerHTML={{__html: (column.template(val, row))}}/> : templateResult) : (val ? val : column.default)}
                    {column.append !== null ? column.append : ""}
                </>
            );
        };

        const columns = props.columns.filter((el) => el !== null && el.display === true);

        const {order, filters} = this.props;
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


        return props.data.map((row, index) => {

            const key = row.id != undefined ? row.id : uuidv4();

            return (<Row
                key={key}
                _key={key}
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
                cache={cache}

            />);

        });

    }
}

export class Row extends React.PureComponent<any, any> {

    public render() {

        const props = this.props;
        const {columns, row, packFn, cache, _key} = this.props;


        return (<tr
            className={props.rowClassTemplate ? props.rowClassTemplate(row) : ""}
            style={props.rowStyleTemplate ? props.rowStyleTemplate(row) : {}}

        >
            {props.selectable && <td className={"w-table-selection-cell"}>
                <input type="checkbox" onChange={props.onCheck} checked={this.props.isSelected}/>
            </td>}
            {columns.map((column, index2) => {
                let style = cache[index2].style;
                if (column.styleTemplate !== null) {
                    style = {...style, ...column.styleTemplate(row, column)};
                }
                let className = null;
                if (column.classTemplate !== null) {
                    className = cache[index2].classes.concat(column.classTemplate(row, column)).join(" ");
                } else if (cache[index2].classes.length > 0) {
                    className = cache[index2].classes.join(" ");
                }

                return (
                    <td
                        key={_key + index2}
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
                        className={className}
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