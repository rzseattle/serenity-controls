import produce from "immer";
import { IGridFilterValue } from "../../../interfaces/IGridFilter";

export const onSelect = (
    option: { value: string | number; label: string | number | JSX.Element },
    values: IGridFilterValue[],
    multipleValues = false,
): IGridFilterValue[] => {
    if (values != undefined && isSelected(option.value, values)) {
        return produce<IGridFilterValue[]>(values, (draft) => {
            const index = draft.findIndex((value) => value.value === option.value);
            if (index !== -1) draft.splice(index, 1);
        });
    } else {
        const newValue: IGridFilterValue = {
            value: option.value,
            labelValue: option.label + "",
            condition: "=",
            labelCondition: "",
            operator: "or",
        };
        return multipleValues ? [...values, newValue] : [newValue];
    }
};

export const isSelected = (value: string | number, values: IGridFilterValue[]) => {
    return values.filter((el) => el.value === value).length > 0;
};
