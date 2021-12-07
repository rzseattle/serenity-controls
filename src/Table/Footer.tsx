import * as React from "react";
import { IColumnData } from "./Interfaces";
import { fI18n } from "../lib";
import { MdFirstPage, MdLastPage, MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { CommonIcons } from "../lib/CommonIcons";

interface IFooterProps {
    count: number;
    onPage: number;
    currentPage: number;
    columns: IColumnData[];
    onPageChanged: (page: number) => any;
    currentPageChanged: (page: number) => any;
    reload: () => any;
}

export default class Footer extends React.Component<IFooterProps> {
    constructor(props: IFooterProps) {
        super(props);
    }

    public render() {
        const props = this.props;

        const pages = Math.max(Math.ceil(props.count / props.onPage), 1);

        const leftRightCount = 0;

        const from = Math.max(1, Math.min(pages - leftRightCount * 2, Math.max(1, props.currentPage - leftRightCount)));
        const arr = ((a: number, b: number[]) => {
            while (a--) {
                b[a] = a + from;
            }
            return b;
        })(Math.min(leftRightCount * 2 + 1, pages > 0 ? pages : 1), []);

        return (
            <tr>
                <td colSpan={props.columns.length + 1} className="w-table-footer-main">
                    <div className="w-table-pager">
                        <div onClick={() => props.currentPageChanged(1)}>
                            <MdFirstPage />
                        </div>
                        <div onClick={() => props.currentPageChanged(Math.max(1, props.currentPage - 1))}>
                            <MdNavigateBefore />
                        </div>
                        {arr.map((el, i) => (
                            <div
                                key={i}
                                onClick={() => props.currentPageChanged(el)}
                                className={el == props.currentPage ? "w-table-pager-active" : ""}
                            >
                                {el}
                            </div>
                        ))}
                        <div onClick={() => props.currentPageChanged(Math.min(props.currentPage + 1, pages))}>
                            <MdNavigateNext />
                        </div>
                        <div onClick={() => props.currentPageChanged(pages)}>
                            <MdLastPage />
                        </div>
                    </div>

                    <div className="w-table-footer-pageinfo">
                        {props.currentPage} / {pages} [ {props.count} ]
                    </div>

                    <div className="w-table-footer-onpage-select">
                        <span>{fI18n.t("Na stronie")}</span>
                        <select value={props.onPage} onChange={(e) => props.onPageChanged(parseInt(e.target.value))}>
                            {[10, 25, 50, 100, 500].map((x) => (
                                <option key={"onpageval" + x} value={x}>
                                    {x}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="w-table-buttons">
                        <button
                            title="Odśwież"
                            onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                this.props.reload();
                            }}
                        >
                            <CommonIcons.refresh />
                        </button>
                    </div>
                </td>
            </tr>
        );
    }
}
