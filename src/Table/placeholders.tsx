import * as React from "react";

export function Loading(props: { colspan: number }) {
    return (
        <tr>
            <td className="w-table-center" colSpan={props.colspan}>
                {/*<i className="fa fa-spinner fa-spin"></i>*/}
            </td>
        </tr>
    );
}

export function EmptyResult(props: { colspan: number }) {
    return (
        <tr>
            <td className="w-table-center" colSpan={props.colspan}>
                <h4>Brak danych</h4>
            </td>
        </tr>
    );
}

export function Error(props: { colspan: number; error: string }) {
    return (
        <tr>
            <td colSpan={props.colspan}>
                <h4>Datasource error</h4>
                <pre>
                    <span dangerouslySetInnerHTML={{ __html: props.error }} />
                </pre>
            </td>
        </tr>
    );
}
