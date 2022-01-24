import React, { ReactElement, useEffect, useRef } from "react";
import { useImmer } from "use-immer";
import styles from "./GridCommonFilter.module.sass";
import { IGridFilter, IGridFilterValue } from "../../../../interfaces/IGridFilter";
import GridFilterBody from "../../Common/GridFilterBody";

interface IGridAdvancedFilterContainerProps {
    filter: IGridFilter;
    onValueChange: (filterValue: IGridFilterValue[]) => unknown;
    onFilterChange: (filter: IGridFilter) => unknown;
    showCaption: boolean;
    fieldComponent: (
        filterValue: IGridFilterValue,
        onChange: (value: string, label: string) => unknown,
    ) => ReactElement;
    conditions: {
        value: string;
        label: string;
    }[];
}

const GridAdvancedFilterContainer = ({
    showCaption,
    onFilterChange,
    onValueChange,
    filter,
    conditions,
    fieldComponent,
}: IGridAdvancedFilterContainerProps) => {
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
            <GridFilterBody
                filter={filter}
                onFilterChange={onFilterChange}
                showAdvancedSwitch={true}
                showCaption={showCaption}
            >
                <div className={styles.rows + " " + (filter.isInAdvancedMode ? styles.advancedMode : "")}>
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
                                {filter.isInAdvancedMode && (
                                    <>
                                        {index > 0 ? (
                                            <div
                                                className={styles.inRowAction}
                                                onClick={() => {
                                                    setValue((draft) => {
                                                        draft[index].operator =
                                                            draft[index].operator !== "or" ? "or" : "and";
                                                    });
                                                }}
                                            >
                                                {valueEl.operator !== "or" ? "or" : "and"}
                                            </div>
                                        ) : (
                                            <div></div>
                                        )}
                                    </>
                                )}
                                <div className={styles.inRowAction} style={{ padding: 0 }}>
                                    <select
                                        value={valueEl.condition}
                                        onChange={(e) => {
                                            const newValue = conditions[e.currentTarget.selectedIndex];

                                            setValue((draft) => {
                                                draft[index].condition = newValue.value;
                                                draft[index].labelCondition = newValue.label;
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
                                {filter.isInAdvancedMode && (
                                    <>
                                        {value?.length > 1 ? (
                                            <div
                                                className={styles.inRowAction}
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
                                        ) : (
                                            <div></div>
                                        )}
                                    </>
                                )}
                            </div>
                        );
                    })}

                    {filter.isInAdvancedMode && (
                        <>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div
                                className={styles.addFieldButton}
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
                        </>
                    )}
                </div>
            </GridFilterBody>
        </>
    );
};

export default GridAdvancedFilterContainer;
