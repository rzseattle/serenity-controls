import React, { useEffect, useRef } from "react";
import { useImmer } from "use-immer";
import { IGridFilterComponent, IGridFilterValue } from "../interfaces/IGridFilter";
import { useGridContext } from "../config/GridContext";
import { CommandMenu } from "../../CommandMenu";
import styles from "./GridTextFilter.module.sass";

const GridTextFilter: IGridFilterComponent = ({ onChange, filter }) => {
    const config = useGridContext();
    const isInitialMount = useRef(true);
    const [value, setValue] = useImmer<IGridFilterValue[]>(
        filter.value.length > 0
            ? filter.value
            : [
                  {
                      value: "",
                      condition: "LIKE",
                      operator: "and",

                  },
              ],
    );

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            onChange(value);
        }
    }, [value]);

    const options: {
        value: string;
        label: string;
    }[] = [
        { value: "LIKE", label: config.locale.filter.like },
        { value: "=", label: config.locale.filter.equals },
        { value: "!=", label: config.locale.filter.differentThan },
        { value: "NOT LIKE", label: config.locale.filter.notLike },
        { value: "^%", label: config.locale.filter.startsWith },
        { value: "%$", label: config.locale.filter.endsWith },
    ];

    return (
        <div className={styles.main}>
            {filter.caption && <div className={styles.title}>{filter.caption}</div>}
            {value.map((valueEl, index) => (
                <div key={index} className={styles.valueRow}>
                    <input
                        type="text"
                        value={valueEl.value}
                        onChange={(e) => {
                            setValue((draft) => {
                                draft[index].value = e.target.value;
                                draft[index].labelValue = null;
                            });
                        }}
                    />
                    {index + 1 === value.length && (
                        <div
                            className={styles.button}
                            onClick={() => {
                                setValue((draft) => {
                                    draft[index].operator = draft[index].operator === "and" ? "or" : "and";
                                });
                            }}
                        >
                            {valueEl.operator === "or" ? "or" : "and"}
                        </div>
                    )}
                    <div className={styles.button + " " + styles.filterType}>
                        <CommandMenu
                            items={options.map((o) => ({
                                key: o.value,
                                label: o.label,
                                onClick: () => {
                                    setValue((draft) => {
                                        draft[index].condition = o.value;
                                        draft[index].labelCondition = o.label;
                                    });
                                },
                            }))}
                        >
                            {(opened) => <div>{options.filter((el) => el.value === valueEl.condition)[0]?.label}</div>}
                        </CommandMenu>
                    </div>
                    {value.length > 1 && (
                        <div
                            className={styles.button}
                            onClick={() => {
                                setValue((draft) => {
                                    draft.splice(index, 1);
                                    //value will be empty
                                    if (value.length === 1) {
                                        draft.push({
                                            value: "",
                                            condition: options[0].value,
                                            labelCondition: options[0].label,
                                        });
                                    }
                                });
                            }}
                        >
                            -
                        </div>
                    )}
                    {index + 1 === value.length && (
                        <div
                            className={styles.button}
                            onClick={() => {
                                setValue((draft) => {
                                    draft.push({
                                        value: "",
                                        condition: options[0].value,
                                        labelCondition: options[0].label,
                                    });
                                });
                            }}
                        >
                            +
                        </div>
                    )}
                </div>
            ))}
            {filter.description && <div className={styles.description}>{filter.description}</div>}
        </div>
    );
};

export default GridTextFilter;
