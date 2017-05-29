import React, {Component} from 'react';
import PropTypes from 'prop-types';

const SimpleTable = (props) => {

    let children = props.children;
    if (children == undefined) {
        children = [];
    }

    for (let i in props.fromFlatObject) {
        children.push(<SimpleTableRow key={i} cols={[i, props.fromFlatObject[i]]}/>)
    }

    return (
        <table className="table table-striped">
            <tbody>{children}</tbody>
        </table>
    )
}
SimpleTable.propTypes = {
    fromFlatObject: PropTypes.object
}

SimpleTable.defaultProps = {
    fromFlatObject: {}
}

const SimpleTableRow = (props) => {
    return (
        <tr>
            {props.cols.map((el, index) =>
                <td key={index}>{el}</td>
            )}
        </tr>
    )
}

SimpleTableRow.propTypes = {
    cols: PropTypes.array.isRequired
}

export {SimpleTable, SimpleTableRow};