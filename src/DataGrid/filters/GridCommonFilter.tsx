import React, { ReactElement, useEffect, useRef } from "react";
import { useImmer } from "use-immer";
import { IGridFilter, IGridFilterValue } from "../interfaces/IGridFilter";
import { CommandMenu } from "../../CommandMenu";
import styles from "./GridTextFilter.module.sass";
import produce from "immer";

interface IGridCommonFilterProps {
    filter: IGridFilter;
    onValueChange: (filterValue: IGridFilterValue[]) => unknown;
    onFilterChange: (filter: IGridFilter) => unknown;
    fieldComponent: (
        filterValue: IGridFilterValue,
        onChange: (value: string, label: string) => unknown,
    ) => ReactElement;
    conditions: {
        value: string;
        label: string;
    }[];
}

const GridCommonFilter = ({
    onFilterChange,
    onValueChange,
    filter,
    conditions,
    fieldComponent,
}: IGridCommonFilterProps) => {
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
            onValueChange(value);
        }
    }, [value]);

    return (
        <div
            className={styles.main}
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                    alert("x");
                }
            }}
        >
            {filter.caption && (
                <div className={styles.title}>
                    <a
                        onClick={(e) => {
                            e.stopPropagation();
                            onFilterChange(
                                produce<IGridFilter>(filter, (draft) => {
                                    draft.isInAdvancedMode = !draft.isInAdvancedMode;
                                }),
                            );
                        }}
                    >
                        {filter.isInAdvancedMode ? "-" : "+"} {filter.caption}
                    </a>
                </div>
            )}
            {value.map((valueEl, index) => {
                const FieldComponent = fieldComponent(valueEl, (value, label) => {
                    setValue((draft) => {
                        draft[index].value = value;
                        draft[index].labelValue = label;
                    });
                });
                return (
                    <div key={index} className={styles.valueRow}>
                        <div>{FieldComponent}</div>
                        {filter.isInAdvancedMode && index > 0 && (
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
                                items={conditions.map((o) => ({
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
                                {() => <div>{conditions.filter((el) => el.value === valueEl.condition)[0]?.label}</div>}
                            </CommandMenu>
                        </div>
                        {filter.isInAdvancedMode && value.length > 1 && (
                            <div
                                className={styles.button}
                                onClick={() => {
                                    setValue((draft) => {
                                        draft.splice(index, 1);
                                        //value will be empty
                                        if (value.length === 1) {
                                            draft.push({
                                                value: "",
                                                condition: conditions[0].value,
                                                labelCondition: conditions[0].label,
                                            });
                                        }
                                    });
                                }}
                            >
                                -
                            </div>
                        )}
                        {filter.isInAdvancedMode && index + 1 === value.length && (
                            <div
                                className={styles.button}
                                onClick={() => {
                                    setValue((draft) => {
                                        draft.push({
                                            value: "",
                                            condition: conditions[0].value,
                                            labelCondition: conditions[0].label,
                                        });
                                    });
                                }}
                            >
                                +
                            </div>
                        )}
                    </div>
                );
            })}
            {filter.description && <div className={styles.description}>{filter.description}</div>}
        </div>
    );
};

export default GridCommonFilter;
