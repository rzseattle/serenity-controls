import React from "react";

import { IGridFilterComponent, IGridFilterValue } from "../../interfaces/IGridFilter";

import sharedStyles from "./GridSharedFilterStyles.module.sass";
import styles from "./GridSwitchFilter.module.sass";
import produce from "immer";

interface IGridSwitchFilterOption {
    value: string | number;
    label: string | number | JSX.Element;
}

export interface IGridSwitchFilterConfig {
    values: IGridSwitchFilterOption[];
    multiselect?: boolean;

}

const GridSwitchFilter: IGridFilterComponent = ({ onValueChange, filter }) => {
    const filterConfig: IGridSwitchFilterConfig = filter.config;

    const onSelect = (option: IGridSwitchFilterOption) => {
        if (isSelected(option.value)) {
            onValueChange(
                produce<IGridFilterValue[]>(filter.value, (draft) => {
                    const index = draft.findIndex((value) => value.value === option.value);
                    if (index !== -1) draft.splice(index, 1);
                }),
            );
        } else {
            const newValue: IGridFilterValue = {
                value: option.value,
                condition: "=",
                labelCondition: "",
                operator: "or",
            };
            onValueChange(filter.config.multiselect ? [...filter.value, newValue] : [newValue]);
        }
    };

    const isSelected = (value: string | number) => {
        return filter.value.filter((el) => el.value === value).length > 0;
    };

    return (
        <div className={sharedStyles.main}>
            {filter.caption && <div className={sharedStyles.title}>{filter.caption}</div>}
            <div className={styles.buttons}>
                {filterConfig.values.map((el: IGridSwitchFilterOption) => {
                    return (
                        <button
                            key={el.value}
                            className={isSelected(el.value) ? styles.selected : ""}
                            onClick={() => onSelect(el)}
                        >
                            {el.label}
                        </button>
                    );
                })}

                <hr />
                <select
                    onChange={(e) => {
                        const index = e.currentTarget.selectedIndex;

                        if (index !== 0) {
                            onSelect(filterConfig.values[index - 1]);
                        } else {
                            //onSelect(filterConfig.values[index - 1]);
                            onValueChange([]);
                        }
                    }}
                >
                    <option value="-1"> --- </option>
                    {filterConfig.values.map((el: IGridSwitchFilterOption) => {
                        return (
                            <option key={el.value} selected={isSelected(el.value)}>
                                {el.label}
                            </option>
                        );
                    })}
                </select>
            </div>

            {filter.description && <div className={sharedStyles.description}>{filter.description}</div>}
        </div>
    );
};

export default GridSwitchFilter;
