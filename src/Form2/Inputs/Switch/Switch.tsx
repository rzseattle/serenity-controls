import React from "react";
import CommonInput, { ICommonInputProps } from "../CommonInput/CommonInput";
import { Control } from "react-hook-form/dist/types/form";
import { IOption } from "../../../fields";
import { useController } from "react-hook-form";
import styles from "./Switch.module.sass";

export interface ISwitchProps extends ICommonInputProps {
    name?: string;
    value?: string;
    readonly?: boolean;
    control: Control<any, any>;
    options: IOption[];
}
const Switch = (props: ISwitchProps) => {
    const control = useController({ name: props.name, control: props.control });

    return (
        <CommonInput
            label={props.label}
            fieldState={control.fieldState}
            readonly={props.readonly}
            help={props.help}
            readOnlyPresenter={props.readOnlyPresenter}
            valueForPresenter={() => ({
                real: control.field.value,
                presented: props.options.filter((el) => el.value === control.field.value)[0]?.label,
            })}
        >
            <div className={styles.list}>
                {props.options.map((option) => {
                    return (
                        <button
                            className={option.value === control.field.value ? styles.selected : ""}
                            key={option.value as string}
                            onClick={() => {
                                control.field.onChange({ target: { value: option.value } });
                            }}
                        >
                            {option.label}
                        </button>
                    );
                })}
            </div>
        </CommonInput>
    );
};
export { Switch };
