import React from "react";
import CommonInput, { ICommonInputProps } from "../CommonInput/CommonInput";

import { useController } from "react-hook-form";
import { Control } from "react-hook-form/dist/types/form";

export interface ITextareaProps extends ICommonInputProps {
    name?: string;
    value?: string;
    readonly?: boolean;
    control: Control<any, any>;
    style?: React.CSSProperties
}

const Textarea = (props: ITextareaProps) => {
    const control = useController({ name: props.name, control: props.control });

    return (
        <CommonInput label={props.label} fieldState={control.fieldState}>
            {props.readonly ? (
                <div className="w-read-only">{control.field.value}</div>
            ) : (
                <textarea
                    style={props.style}
                    {...props.control.register(props.name)}
                    onChange={(e) => {
                        control.field.onChange({ target: { value: e.target.value } });
                    }}
                    onBlur={() => {
                        control.field.onBlur();
                    }}
                    value={control.field.value}
                />
            )}
        </CommonInput>
    );
};

export default Textarea;
