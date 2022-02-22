import { RelativePositionPresets } from "../../../../Positioner";
import produce from "immer";
import { isGridColumnElementEqual } from "../../../helpers/helpers";
import { Modal } from "../../../../Modal";
import React from "react";
import styles from "./GridFiltersModal.module.sass";
import { IFiltersChange } from "../../../interfaces/IFiltersChange";
import { IGridFilter } from "../../../interfaces/IGridFilter";
import GridFiltersPanel from "../GridFiltersPanel/GridFiltersPanel";

export interface IGridFiltersModalProps {
    relativeTo: HTMLElement;
    onHide: () => any;
    onFiltersChange: IFiltersChange;
    editedFilter: IGridFilter[];
    filters: IGridFilter[];
}

const GridFiltersModal = ({ relativeTo, onHide, onFiltersChange, editedFilter, filters }: IGridFiltersModalProps) => {
    return (
        <Modal
            relativeTo={() => relativeTo}
            relativeSettings={{ ...RelativePositionPresets.bottomLeft, widthCalc: "min" }}
            show={true}
            shadow={false}
            className=""
            onHide={onHide}
        >
            <div onClick={(e) => e.stopPropagation()} className={styles.filtersPanelContainer} style={{}}>
                <GridFiltersPanel
                    onCancel={onHide}
                    onFiltersChange={(localFilters) => {
                        onHide();
                        onFiltersChange(
                            produce(filters, (draft) => {
                                draft.forEach((el) => {
                                    localFilters.forEach((localFilter) => {
                                        if (isGridColumnElementEqual(el, localFilter)) {
                                            el.value = localFilter.value;
                                        }
                                    });
                                });
                            }),
                        );
                    }}
                    filters={editedFilter}
                />
            </div>
        </Modal>
    );
};
export default GridFiltersModal;
