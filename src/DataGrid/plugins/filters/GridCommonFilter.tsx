import React, { ReactElement, useEffect, useRef } from "react";
import { useImmer } from "use-immer";
import sharedStyles from "./GridSharedFilterStyles.module.sass";
import produce from "immer";
import { IGridFilter, IGridFilterValue } from "../../interfaces/IGridFilter";

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
        filter.value?.length > 0
            ? filter.value
            : [
                  {
                      value: "",
                      condition: conditions[0].value,
                      labelCondition: conditions[0].label,
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
        <>
            {filter.caption && (
                <div className={sharedStyles.title}>
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
                    <div key={index} className={sharedStyles.valueRow}>
                        <div className={sharedStyles.fieldBlock}>{FieldComponent}</div>
                        {filter.isInAdvancedMode && index > 0 && (
                            <div
                                className={sharedStyles.button}
                                onClick={() => {
                                    setValue((draft) => {
                                        draft[index].operator = draft[index].operator === "and" ? "or" : "and";
                                    });
                                }}
                            >
                                {valueEl.operator === "or" ? "or" : "and"}
                            </div>
                        )}
                        <div className={sharedStyles.button + " " + sharedStyles.filterType} style={{ padding: 0 }}>
                            <select
                                value={valueEl.condition}
                                onChange={(e) => {
                                    setValue((draft) => {
                                        draft[index].condition = e.currentTarget.value;
                                        draft[index].labelCondition = conditions.filter(
                                            (c) => c.value == e.currentTarget.value,
                                        )[0].label;
                                    });
                                }}
                            >
                                {conditions.map((o) => {
                                    return (
                                        <option value={o.value} key={o.value}>
                                            {o.label}
                                        </option>
                                    );
                                })}
                                ;
                            </select>
                        </div>
                        {filter.isInAdvancedMode && value.length > 1 && (
                            <div
                                className={sharedStyles.button}
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
                                className={sharedStyles.button}
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
            {filter.description && <div className={sharedStyles.description}>{filter.description}</div>}
        </>
    );
};

export default GridCommonFilter;
