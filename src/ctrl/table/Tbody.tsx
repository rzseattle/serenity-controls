import * as React from "react";
import {deepIsEqual} from "frontend/src/lib/JSONTools";
import * as uuidv4 from 'uuid/v4'
//const uuidv4 = require('uuid/v4');


export default class Tbody extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }


    shouldComponentUpdate(nextProps, nextState) {

        return !deepIsEqual(
            [
                this.props.data,
                this.props.selection,
            ],
            [
                nextProps.data,
                nextProps.selection,
            ]
        )
    }


    render() {
        let props = this.props;

        const packValue = (val, column, row) => {
            let templateResult = false;
            if (column.template) {
                templateResult = column.template(val, row);

            }
            return (
                <div>
                    {column.icon ? <i className={'w-table-prepend-icon fa ' + column.icon}></i> : ''}
                    {column.prepend ? column.prepend : ''}
                    {templateResult ? (typeof templateResult == 'string' ? <span dangerouslySetInnerHTML={{__html: (column.template(val, row))}}></span> : templateResult) : (val ? val : column.default)}
                    {column.append ? column.append : ''}
                </div>
            )
        };

        const columns = props.columns.filter(el => el !== null && el.display === true);

        let cache = {};

        for (let index = 0; index < columns.length; index++) {
            let column = columns[index];
            cache[index] = cache[index] || {}
            cache[index].classes = [];
            if (props.order[column.field] !== undefined) {
                cache[index].classes.push('w-table-sorted w-table-sorted-' + props.order[column.field].dir);
            }
            if (props.filters[column.field] !== undefined) {
                cache[index].classes.push('w-table-filtered')
            }
            if (
                column.events.click && column.events.click.length > 0 ||
                column.events.mouseUp && column.events.mouseUp.length > 0
            ) {
                cache[index].classes.push('w-table-cell-clickable');
            }
            cache[index].classes = cache[index].classes.concat(column.class);

        }


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

            />
        );


    }
}
//00:14:15;10
//00:14:42;18

export class Row extends React.PureComponent<any, any> {

    render() {

        const props = this.props;
        let {columns, row, packFn, order, filters} = this.props;

        let cache = {};

        for (let index = 0; index < columns.length; index++) {
            let column = columns[index];
            cache[index] = cache[index] || {}
            cache[index].classes = [];
            if (order[column.field] !== undefined) {
                cache[index].classes.push('w-table-sorted w-table-sorted-' + order[column.field].dir);
            }
            if (filters[column.field] !== undefined) {
                cache[index].classes.push('w-table-filtered')
            }
            if (
                column.events.click && column.events.click.length > 0 ||
                column.events.mouseUp && column.events.mouseUp.length > 0
            ) {
                cache[index].classes.push('w-table-cell-clickable');
            }
            cache[index].classes = cache[index].classes.concat(column.class);

        }


        return (<tr
            className={props.rowClassTemplate ? props.rowClassTemplate(row) : ''}
            style={props.rowStyleTemplate ? props.rowStyleTemplate(row) : {}}

        >
            {columns.map((column, index2) => {
                return (
                    <td
                        key={uuidv4()}
                        style={{width: column.width, ...column.styleTemplate(row, column)}}
                        onClick={column.events.click ? (event) => {
                            column.events.click.map((callback) => {
                                callback.bind(this)(row, column, event, this);
                            })
                        } : function () {
                        }}
                        onMouseUp={column.events.mouseUp ? (event) => {
                            column.events.mouseUp.map((callback) => {
                                callback.bind(this)(row, column, event, this);
                            })
                        } : function () {
                        }}
                        onMouseEnter={column.events.enter ? (event) => {
                            column.events.enter.map((callback) => {
                                callback.bind(this)(row, column, event, this);
                            })
                        } : function () {
                        }}
                        onMouseLeave={column.events.leave ? (event) => {
                            column.events.leave.map((callback) => {
                                callback.bind(this)(row, column, event, this);
                            })
                        } : function () {
                        }}
                        className={cache[index2].classes.concat(column.classTemplate(row, column)).join(' ')}

                    >
                        {packFn(row[column.field] ? row[column.field] : column.default, column, row)}
                    </td>
                )
            })}
        </tr>);
    }
}

const Cell = (props) => {

}

