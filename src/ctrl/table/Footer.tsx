import * as React from "react";
import {deepIsEqual} from "frontend/src/lib/JSONTools";


export default class Footer extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
        /*return !deepIsEqual(
            [
                this.props.columns,
                this.props.onPage,
                this.props.currentPage
            ],
            [
                nextProps.columns,
                nextProps.onPage,
                nextProps.currentPage
            ]
        )*/
    }

    render() {
        let props = this.props;

        const pages = Math.max(Math.ceil(props.count / props.onPage), 1);

        const leftRightCount = 0;

        const from = Math.max(1, Math.min(pages - leftRightCount * 2, Math.max(1, props.currentPage - leftRightCount)));
        var arr = (function (a, b) {
            while (a--) b[a] = a + from;
            return b
        })(Math.min(leftRightCount * 2 + 1, pages > 0 ? pages : 1), []);
        const table = props.parent;

        return (
            <tr>
                <td colSpan={props.columns.length + 1} className="w-table-footer-main">


                    <div className="w-table-pager">
                        <div onClick={(e) => props.currentPageChanged(1)}><i className="fa fa-angle-double-left"></i></div>
                        <div onClick={(e) => props.currentPageChanged(Math.max(1, props.currentPage - 1))}><i className="fa fa-angle-left"></i></div>
                        {arr.map((el, i) =>
                            <div key={i} onClick={(e) => props.currentPageChanged(el)} className={el == props.currentPage ? 'w-table-pager-active' : ''}>{el}</div>
                        )}
                        <div onClick={(e) => props.currentPageChanged(Math.min(props.currentPage + 1, pages))}><i className="fa fa-angle-right"></i></div>
                        <div onClick={(e) => props.currentPageChanged(pages)}><i className="fa fa-angle-double-right"></i></div>
                    </div>

                    <div className="w-table-footer-pageinfo">
                        {props.currentPage} / {pages} [ {props.count} ]
                    </div>

                    <div className="w-table-footer-onpage-select">
                        <span>Na stronie: </span>
                        <select value={props.onPage} onChange={(e) => props.onPageChanged(parseInt(e.target.value))}>
                            {([10, 25, 50, 100, 500]).map((x, i) =>
                                <option key={'onpageval' + x} value={x}>{x}</option>
                            )}
                        </select>
                    </div>


                    <div className="w-table-buttons">

                        <button title="Usuń zmiany" onClick={table.handleStateRemove.bind(table)}><i className="fa fa-eraser"></i></button>
                        <button title="Odśwież" onClick={table.load.bind(table)}><i className="fa fa-refresh"></i></button>
                        {/*<button title="Zmień sposób wyświetlania" onClick={table.toggleFixedLayout.bind(table)}><i className="fa fa-window-restore"></i></button>*/}
                        <div
                            title="Przesuń i upuść aby zmienić rozmiar tabeli"
                            className="w-table-footer-drag"
                            onDragStart={(e) => {
                                props.bodyResizeStart(e)
                            }} onDrag={(e) => {
                            props.bodyResize(e)
                        }}
                            onDragEnd={(e) => {
                                props.bodyResizeEnd(e)
                            }}
                            draggable={true}
                        ><i className="fa fa-arrows-v"></i></div>
                        {/*{table.state.loading ? <button className="w-table-loading-indicator"><i className="fa fa-spinner fa-spin"></i></button> : ''}*/}
                    </div>


                </td>
            </tr>
        )
    }
}
