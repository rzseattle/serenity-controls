import React, { useEffect, useState } from "react";
import { IGridFilterComponent, IGridFilterValue } from "../../interfaces/IGridFilter";
import { useGridContext } from "../../config/GridContext";
import GridCommonFilter from "./GridCommonFilter";

import styles from "./GridDateFilter.module.sass";
import { Calendar, DateRange, Range } from "react-date-range";
import { pl } from "react-date-range/dist/locale";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { addDays, format } from "date-fns";
import { Modal } from "../../../Modal";

const GridDateFilter: IGridFilterComponent = ({ onFilterChange, onValueChange, filter }) => {
    const config = useGridContext();
    const [show, setShow] = useState(false);
    const [range, setRange] = useState<Range[]>([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 7),
            key: "selection",
        },
    ]);
    const [date, setDate] = useState(new Date());

    const setNewValue = (value: IGridFilterValue, onchange: (value: string, label: string) => unknown) => {
        let fieldValue;
        if (value.condition === "=" || value.condition === "!=") {
            fieldValue = format(date, "yyyy-MM-dd");
        } else {
            fieldValue = format(range[0].startDate, "yyyy-MM-dd") + " / " + format(range[0].endDate, "yyyy-MM-dd");
        }
        onchange(fieldValue, null);
    };

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
                            {value.condition === "BETWEEN" && (
                                <DateRange
                                    onChange={(item) => setRange([item.selection])}
                                    moveRangeOnFirstSelection={false}
                                    months={2}
                                    ranges={range}
                                    direction="horizontal"
                                    locale={pl}
                                />
                            )}
                            {(value.condition === "=" || value.condition === "=") && (
                                <Calendar
                                    onChange={(item) => setDate(item)}
                                    date={date}
                                    ranges={range}
                                    direction="horizontal"
                                    locale={pl}
                                />
                            )}
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
                                        setNewValue(value, onchange);
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
                { value: "BETWEEN", label: config.locale.filter.between },
                { value: "=", label: config.locale.filter.equals },
                { value: "!=", label: config.locale.filter.differentThan },
                { value: "set", label: config.locale.filter.dateIsSet },
                { value: "notSet", label: config.locale.filter.dateIsNotSet },
            ]}
        />
    );
};

export default GridDateFilter;
