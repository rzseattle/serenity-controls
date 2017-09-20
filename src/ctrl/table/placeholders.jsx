"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
function Loading(props) {
    return (<tbody>
        <tr>
            <td className="w-table-center" colSpan={props.colspan}>
                
            </td>
        </tr>
        </tbody>);
}
exports.Loading = Loading;
function EmptyResult(props) {
    return (<tbody>
        <tr>
            <td className="w-table-center" colSpan={props.colspan}><h4>Brak danych</h4></td>
        </tr>
        </tbody>);
}
exports.EmptyResult = EmptyResult;
function Error(props) {
    return (<tbody>
        <tr>
            <td colSpan={props.colspan}>
                <span dangerouslySetInnerHTML={{ __html: props.error }}/>
            </td>
        </tr>
        </tbody>);
}
exports.Error = Error;
