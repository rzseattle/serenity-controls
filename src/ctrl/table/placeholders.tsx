import * as React from "react";

export function Loading(props) {
    return (
        <tbody>
        <tr>
            <td className="w-table-center" colSpan={props.colspan}>
                {/*<i className="fa fa-spinner fa-spin"></i>*/}
            </td>
        </tr>
        </tbody>
    )
}

export function EmptyResult(props) {
    return (
        <tbody>
        <tr>
            <td className="w-table-center" colSpan={props.colspan}><h4>Brak danych</h4></td>
        </tr>
        </tbody>
    )
}


export function Error(props) {
    return (
        <tbody>
        <tr>
            <td colSpan={props.colspan}>
                <span dangerouslySetInnerHTML={{__html: props.error}}/>
            </td>
        </tr>
        </tbody>
    )
}
