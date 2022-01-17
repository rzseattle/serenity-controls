import React, { useEffect, useRef, useState } from "react";
import { IGridFilterComponent, IGridFilterValue } from "../../interfaces/IGridFilter";
import { useGridContext } from "../../config/GridContext";
import GridCommonFilter from "./GridCommonFilter";

import styles from "./GridDateFilter.module.sass";
import { Calendar, DateRange, Range } from "react-date-range";
import { pl } from "react-date-range/dist/locale";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { addDays, format, parse } from "date-fns";
import { Modal } from "../../../Modal";

const GridDateFilter: IGridFilterComponent = ({ onFilterChange, onValueChange, filter }) => {
    const config = useGridContext();

    return (
        <GridCommonFilter
            filter={filter}
            onFilterChange={onFilterChange}
            onValueChange={onValueChange}
            fieldComponent={(value, onchange) => {
                return <GridDateFilterRow value={value} onchange={onchange} />;
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

const GridDateFilterRow = ({
    value,
    onchange,
}: {
    value: IGridFilterValue;
    onchange: (value: string, label: string) => unknown;
}) => {
    const config = useGridContext();
    const isInitialMount = useRef(true);
    const dateFormat = "yyyy-MM-dd";
    const [show, setShow] = useState(false);
    const [range, setRange] = useState<Range[]>([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 7),
            key: "selection",
        },
    ]);
    const [date, setDate] = useState(new Date());

    const setNewValue = () => {
        let fieldValue;
        if (value.condition === "=" || value.condition === "!=") {
            fieldValue = format(date, dateFormat);
        } else {
            fieldValue = format(range[0].startDate, dateFormat) + " / " + format(range[0].endDate, dateFormat);
        }
        onchange(fieldValue, null);
    };

    useEffect(() => {
        if (value.value) {
            try {
                if (value.value.indexOf(" / ") !== -1) {
                    const tmp = value.value.split(" / ");

                    setRange([
                        {
                            key: "selection",
                            startDate: parse(tmp[0], dateFormat, new Date()),
                            endDate: parse(tmp[1], dateFormat, new Date()),
                        },
                    ]);
                } else {
                    setDate(parse(value.value, dateFormat, new Date()));
                }
            } catch (ex) {
                console.log(ex);
            }
        }
    }, []);
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            if (value.value) {
                setNewValue();
            }
        }
    }, [value.condition]);

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
                    {value.condition === "set" ? config.filter.icons.checked : config.filter.icons.unchecked}{" "}
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
                    <Calendar onChange={(item) => setDate(item)} date={date} locale={pl} />
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
                            setNewValue();
                            setShow(false);
                        }}
                    >
                        OK
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default GridDateFilter;
