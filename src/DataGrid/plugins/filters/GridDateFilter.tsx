import React, { useState } from "react";
import { IGridFilterComponent } from "../../interfaces/IGridFilter";
import { useGridContext } from "../../config/GridContext";
import GridCommonFilter from "./GridCommonFilter";

import styles from "./GridDateFilter.module.sass";
import { DateRange } from "react-date-range";
import { pl } from "react-date-range/dist/locale";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { addDays, format } from "date-fns";
import { Modal } from "../../../Modal";

const GridDateFilter: IGridFilterComponent = ({ onFilterChange, onValueChange, filter }) => {
    const config = useGridContext();
    const [show, setShow] = useState(false);
    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 7),
            key: "selection",
        },
    ]);

    return (
        <GridCommonFilter
            filter={filter}
            onFilterChange={onFilterChange}
            onValueChange={onValueChange}
            fieldComponent={(value, onchange) => {
                return (
                    <div className={styles.container}>
                        {value.condition !== "set" && value.condition !== "notSet" ? (
                            <>
                                <div className={styles.icon}>{config.filter.icons.calendar}</div>
                                <input
                                    value={value.value}
                                    onClick={() => setShow(true)}
                                    onChange={(e) => onchange(e.target.value, null)}
                                />
                            </>
                        ) : (
                            <div className={styles.notImportant}>
                                {" "}
                                {value.condition === "set"
                                    ? config.filter.icons.checked
                                    : config.filter.icons.unchecked}{" "}
                            </div>
                        )}
                        <Modal
                            show={show}
                            onHide={() => {
                                setShow(false);
                            }}
                        >
                            <DateRange
                                onChange={(item) => setState([item.selection])}
                                showSelectionPreview={true}
                                moveRangeOnFirstSelection={false}
                                months={2}
                                ranges={state}
                                direction="horizontal"
                                locale={pl}
                            />
                            <div className={styles.calendarApplyButtons}>
                                <button
                                    onClick={() => {
                                        setShow(false);
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        onchange(
                                            format(state[0].startDate, "yyyy-MM-dd") +
                                                " / " +
                                                format(state[0].endDate, "yyyy-MM-dd"),
                                            null,
                                        );
                                        setShow(false);
                                    }}
                                >
                                    OK
                                </button>
                            </div>
                        </Modal>
                    </div>
                );
            }}
            conditions={[
                { value: "=", label: config.locale.filter.equals },
                { value: "!=", label: config.locale.filter.differentThan },
                { value: "set", label: config.locale.filter.dateIsSet },
                { value: "notSet", label: config.locale.filter.dateIsNotSet },
            ]}
        />
    );
};

export default GridDateFilter;
