import produce from "immer";
import React, { useState } from "react";
import { useImmer } from "use-immer";
import { IGridFilterComponent, IGridFilterValue } from "../interfaces/IGridFilter";
import { useGridContext } from "../config/GridContext";
import { CommandMenu } from "../../CommandMenu";

const GridTextFilter: IGridFilterComponent = ({ onApply, filter, hide }) => {
    const config = useGridContext();
    const [value, setValue] = useImmer<IGridFilterValue[]>(
        filter.value.length > 0
            ? filter.value
            : [
                  {
                      value: "",
                      condition: "LIKE",
                  },
              ],
    );

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
        <div>
            {false && filter.caption && <div className={"w-filter-title"}>{filter.caption}</div>}
            {value.map((valueEl, index) => (
                <div key={index} onClick={() => {}} style={{ display: "flex" }}>
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
                    <div>
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
                            {(opened) => (
                                <button>{options.filter((el) => el.value === valueEl.condition)[0]?.label}</button>
                            )}
                        </CommandMenu>
                    </div>
                    {value.length > 1 && (
                        <div>
                            <button
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
                            </button>
                        </div>
                    )}
                    {index + 1 === value.length && (
                        <div>
                            <button
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
                            </button>
                        </div>
                    )}
                </div>
            ))}
            <hr />
            {filter.description}
            <hr />

            <button onClick={() => hide()}>{config.locale.cancel}</button>

            <button
                onClick={() => {
                    onApply(value);
                    hide();
                }}
            >
                {config.locale.apply}
            </button>
        </div>
    );
};

export default GridTextFilter;
