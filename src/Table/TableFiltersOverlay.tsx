import * as React from "react";
import { Modal } from "../Modal";
import { IColumnData } from "./Interfaces";
import { FilterPanel, IFilterValue } from "../filters";

const TableFiltersOverlay = ({
    columns,
    onHide,
    onChange,
    filters,
}: {
    columns: IColumnData[];
    onHide: () => any;
    onChange: (filter: IFilterValue, filters: { [key: string]: IFilterValue }) => any;
    filters: { [key: string]: IFilterValue };
}) => {
    const items = columns
        .filter((el) => el.filter != null)
        .map((el) => el.filter)
        .reduce((p, c) => p.concat(c), []);

    return (
        <>
            <Modal
                show={true}
                title="Filtry"
                showHideLink={true}
                top={0}
                right={0}
                bottom={3}
                height={"100%"}
                shadow={false}
                layer={false}
                onHide={onHide}
            >
                <div style={{ height: "90hv" }}>
                    <FilterPanel filters={filters} items={items} onChange={onChange} />
                </div>
                {/*<PrintJSON json={filters} />*/}
            </Modal>
        </>
    );
};
export default TableFiltersOverlay;
