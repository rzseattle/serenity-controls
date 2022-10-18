import React from "react";
import CommonInput, { ICommonInputProps } from "../CommonInput/CommonInput";

import { useController } from "react-hook-form";
import { Control } from "react-hook-form/dist/types/form";

export interface ITextProps extends ICommonInputProps {
    name?: string;
    value?: string;
    readonly?: boolean;
    control: Control<any, any>;
}

const Text = (props: ITextProps) => {
    const control = useController({ name: props.name, control: props.control });

    return (
        <CommonInput
            label={props.label}
            fieldState={control.fieldState}
            readonly={props.readonly}
            help={props.help}
            readOnlyPresenter={props.readOnlyPresenter}
            valueForPresenter={() => ({ real: control.field.value, presented: control.field.value })}

        >
            <input
                type="text"
                readOnly={props.readonly}
                {...props.control.register(props.name)}
                onChange={(e) => {
                    control.field.onChange({ target: { value: e.target.value } });
                }}
                value={control.field.value}
                onBlur={() => {
                    control.field.onBlur();
                }}
            />
        </CommonInput>
    );
};

export { Text };
