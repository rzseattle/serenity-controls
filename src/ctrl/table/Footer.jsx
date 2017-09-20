"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
exports.default = function (props) {
    var pages = Math.max(Math.ceil(props.count / props.onPage), 1);
    var leftRightCount = 0;
    var from = Math.max(1, Math.min(pages - leftRightCount * 2, Math.max(1, props.currentPage - leftRightCount)));
    var arr = (function (a, b) {
        while (a--)
            b[a] = a + from;
        return b;
    })(Math.min(leftRightCount * 2 + 1, pages > 0 ? pages : 1), []);
    var table = props.parent;
    return (<tr>
            <td colSpan={props.columns.length + 1} className="w-table-footer-main">


                <div className="w-table-pager">
                    <div onClick={function (e) { return props.currentPageChanged(1); }}><i className="fa fa-angle-double-left"></i></div>
                    <div onClick={function (e) { return props.currentPageChanged(Math.max(1, props.currentPage - 1)); }}><i className="fa fa-angle-left"></i></div>
                    {arr.map(function (el, i) {
        return <div key={i} onClick={function (e) { return props.currentPageChanged(el); }} className={el == props.currentPage ? 'w-table-pager-active' : ''}>{el}</div>;
    })}
                    <div onClick={function (e) { return props.currentPageChanged(Math.min(props.currentPage + 1, pages)); }}><i className="fa fa-angle-right"></i></div>
                    <div onClick={function (e) { return props.currentPageChanged(pages); }}><i className="fa fa-angle-double-right"></i></div>
                </div>

                <div className="w-table-footer-pageinfo">
                    {props.currentPage} / {pages} [ {props.count} ]
                </div>

                <div className="w-table-footer-onpage-select">
                    <span>Na stronie: </span>
                    <select value={props.onPage} onChange={function (e) { return props.onPageChanged(parseInt(e.target.value)); }}>
                        {([10, 25, 50, 100, 500]).map(function (x, i) {
        return <option key={'onpageval' + x} value={x}>{x}</option>;
    })}
                    </select>
                </div>


                <div className="w-table-buttons">

                    <button title="Usuń zmiany" onClick={table.handleStateRemove.bind(table)}><i className="fa fa-eraser"></i></button>
                    <button title="Odśwież" onClick={table.load.bind(table)}><i className="fa fa-refresh"></i></button>
                    
                    <div title="Przesuń i upuść aby zmienić rozmiar tabeli" className="w-table-footer-drag" onDragStart={function (e) {
        props.bodyResizeStart(e);
    }} onDrag={function (e) {
        props.bodyResize(e);
    }} onDragEnd={function (e) {
        props.bodyResizeEnd(e);
    }} draggable={true}><i className="fa fa-arrows-v"></i></div>
                    
                </div>


            </td>
        </tr>);
};
