import React, { useEffect, useRef, useState } from "react";
import { IGridFilterComponent, IGridFilterValue } from "../../../../interfaces/IGridFilter";
import { useGridContext } from "../../../../config/GridContext";
import GridAdvancedFilterContainer from "../GridCommonFilter/GridAdvancedFilterContainer";

import styles from "./GridDateFilter.module.sass";
import { Calendar, DateRange, Range } from "react-date-range";
import { addDays, format, parse } from "date-fns";

import { pl } from "date-fns/locale";

import { Modal } from "../../../../../Modal";
import { RelativePositionPresets } from "../../../../../Positioner";

const GridDateFilter: IGridFilterComponent = ({ autoFocus, showCaption, onFilterChange, onValueChange, filter }) => {
    const config = useGridContext();

    return (
        <GridAdvancedFilterContainer
            showCaption={showCaption}
            filter={filter}
            onFilterChange={onFilterChange}
            onValueChange={onValueChange}
            fieldComponent={(value, onchange) => {
                return <GridDateFilterRow autoFocus={autoFocus} value={value} onchange={onchange} />;
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
    autoFocus,
}: {
    value: IGridFilterValue;
    onchange: (value: string, label: string) => unknown;
    autoFocus: boolean;
}) => {
    const config = useGridContext();
    const inputRef = useRef<HTMLInputElement>();
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
        if (autoFocus && inputRef.current) {
            inputRef.current.focus();
        }

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
                console.error(ex);
            }
        }
    }, [autoFocus, inputRef.current]);

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
                <div className={styles.inputContainer}>
                    <div className={styles.icon}>{config.filter.icons.calendar}</div>
                    <input
                        data-testid="input"
                        ref={inputRef}
                        value={value.value}
                        onClick={() => setShow(true)}
                        onChange={(e) => onchange(e.target.value, null)}
                    />
                </div>
            ) : (
                <div className={styles.notImportant}>
                    {value.condition === "set" ? config.filter.icons.checked : config.filter.icons.unchecked}{" "}
                </div>
            )}
            <Modal
                show={show}
                relativeTo={() => inputRef.current}
                relativeSettings={RelativePositionPresets.bottomLeft}
                onHide={() => {
                    setShow(false);
                }}
            >
                {value.condition === "BETWEEN" && (
                    // @ts-ignore
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
                    // @ts-ignore
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
                        data-testid={"ok-button"}
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
