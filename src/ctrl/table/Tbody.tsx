import * as React from "react";

export default (props) => {

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


    return (

        <tbody style={{maxHeight: props.bodyHeight}}>


        {props.data.map((row, index) =>
            <tr key={index}
                className={props.rowClassTemplate ? props.rowClassTemplate(row, index) : ''}
                style={props.rowStyleTemplate ? props.rowStyleTemplate(row, index) : {}}
            >
                {props.selectable ?
                    <td className="w-table-selection-cell" onClick={(e) => props.onCheck(index, e)}>
                        <input type="checkbox" checked={props.selection.indexOf(index) != -1}/>
                    </td>
                    : null}
                {columns.map((column, index2) => {

                    return (<td key={'cell' + index2}
                                style={{width: column.width, ...column.styleTemplate(row, column)}}
                                onClick={column.events.click ? (event) => {
                                    column.events.click.map((callback) => {
                                        callback.bind(this)(row, column, event);
                                    })
                                } : function () {
                                }}
                                onMouseUp={column.events.mouseUp ? (event) => {
                                    column.events.mouseUp.map((callback) => {
                                        callback.bind(this)(row, column, event);
                                    })
                                } : function () {
                                }}
                                onMouseEnter={column.events.enter ? (event) => {
                                    column.events.enter.map((callback) => {
                                        callback.bind(this)(row, column, event);
                                    })
                                } : function () {
                                }}
                                onMouseLeave={column.events.leave ? (event) => {
                                    column.events.leave.map((callback) => {
                                        callback.bind(this)(row, column, event);
                                    })
                                } : function () {
                                }}
                                className={cache[index2].classes.concat(column.classTemplate(row, column)).join(' ')}
                        >

                            {packValue(row[column.field] ? row[column.field] : column.default, column, row)}
                        </td>
                    )
                })}
            </tr>
        )}

        </tbody>
    )
}
