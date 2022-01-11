import { MdFirstPage, MdLastPage, MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import React from "react";
import styles from "./Pagination.module.sass";

interface IPaginationProps {
    currentPage: number;
    setCurrentPage: (currentPage: number) => unknown;
    onPage: number;
    setOnPage: (onPage: number) => unknown;
    all: number;
}

const Pagination = ({ currentPage, setCurrentPage, onPage, setOnPage, all }: IPaginationProps) => {
    const pages = Math.max(Math.ceil(all / onPage), 1);
    const leftRightCount = 0;

    const from = Math.max(1, Math.min(pages - leftRightCount * 2, Math.max(1, currentPage - leftRightCount)));
    const arr = ((a: number, b: number[]) => {
        while (a--) {
            b[a] = a + from;
        }
        return b;
    })(Math.min(leftRightCount * 2 + 1, pages > 0 ? pages : 1), []);
    return (
        <div className={styles.main}>
            <div>
                <select
                    value={onPage}
                    onChange={(e) => {
                        setCurrentPage(1);
                        setOnPage(parseInt(e.target.value));
                    }}
                >
                    {[10, 25, 50, 100, 500].map((x) => (
                        <option key={"onpageval" + x} value={x}>
                            {x}
                        </option>
                    ))}
                </select>
            </div>

            <div className={styles.pager}>
                <div onClick={() => setCurrentPage(1)}>
                    <MdFirstPage />
                </div>
                <div onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}>
                    <MdNavigateBefore />
                </div>
                {arr.map((el, i) => (
                    <div
                        key={i}
                        onClick={() => setCurrentPage(el)}
                        className={el == currentPage ? "w-table-pager-active" : ""}
                    >
                        {el}
                    </div>
                ))}
                <div onClick={() => setCurrentPage(Math.min(currentPage + 1, pages))}>
                    <MdNavigateNext />
                </div>
                <div onClick={() => setCurrentPage(pages)}>
                    <MdLastPage />
                </div>
            </div>
            <div>
                {currentPage} / {pages} [ {all} ]
            </div>
        </div>
    );
};

export default Pagination;
